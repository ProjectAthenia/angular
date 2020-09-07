import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {UserService} from '../../services/data-services/user.service';
import {RequestsService} from '../../services/requests/requests.service';
import {Thread} from '../../models/user/thread';
import {MessagingService} from '../../services/data-services/messaging.service';
import {Message} from '../../models/user/message';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.page.html',
    styleUrls: ['./thread.page.scss'],
})
export class ThreadPage implements OnInit, OnDestroy {

    /**
     * The message input
     */
    @ViewChild('messageInput', {static: true})
    messageInput: ElementRef;

    /**
     * The logged in user
     */
    me: User;

    /**
     * The user the logged in user is messaging
     */
    user: User;

    /**
     * The current thread on this page
     */
    thread: Thread;

    /**
     * All messages in this thread
     */
    messages: Message[] = [];

    /**
     * Whether or not the initial load is complete
     */
    loaded = false;

    /**
     * The handle to the current refresh timeout
     */
    refreshTimeout: any;

    /**
     * The message the user has entered
     */
    enteredMessage = '';

    /**
     * Default Constructor
     * @param location
     * @param toastController
     * @param requests
     * @param messagingService
     * @param route
     * @param userService
     */
    constructor(private location: Location,
                private toastController: ToastrService,
                private requests: RequestsService,
                private messagingService: MessagingService,
                private route: ActivatedRoute,
                private userService: UserService) {
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        const userId = parseInt(this.route.snapshot.paramMap.get('user_id'), 0);
        this.userService.getMe().then(me => {
            this.me = me;
            const user = this.userService.getUser(userId);

            if (user == null) {
                this.requests.social.loadUser(userId).then(loadedUser => {
                    this.userService.cacheUser(loadedUser);
                    this.loadThread(loadedUser);
                }).catch(error => {
                    this.location.back();
                    this.toastController.error('Error Loading User');
                });
            } else {
                this.loadThread(user);
            }
        }).catch(error => {
            this.location.back();
            this.toastController.error('Error Loading User');
        });
    }

    /**
     * Loads the thread data from cache or the server
     * @param user
     */
    loadThread(user: User) {

        this.user = user;
        this.thread = this.messagingService.getThreadBetweenPeople(this.me, this.user);

        if (this.thread) {
            this.loadMessages();
        } else {
            this.requests.messaging.getThreads(this.me, true).then(threads => {
                threads.forEach(thread => this.messagingService.cacheThread(thread));
                this.thread = this.messagingService.getThreadBetweenPeople(this.me, this.user);
                if (this.thread == null) {
                    this.requests.messaging.createThread(this.me, this.user).then(thread => {
                        this.messagingService.cacheThread(thread);
                        this.thread = thread;
                        this.loadMessages();
                    }).catch(error => {
                        this.location.back();
                    });
                } else {
                    this.loadMessages();
                }
            }).catch(error => {
                this.location.back();
            });
        }
    }

    /**
     * Clears out the refresh timeout
     */
    ngOnDestroy() {
        clearTimeout(this.refreshTimeout);
    }

    /**
     * Loads all threads freshly from the server
     */
    loadMessages() {
        if (this.refreshTimeout) {
            clearTimeout(this.refreshTimeout);
        }

        this.requests.messaging.getMessages(this.me, this.thread, !this.loaded).then(messages => {
            this.thread.last_message = messages[0];
            this.messages = messages.reverse();
            if (!this.loaded) {
                this.resetScroll();
                this.loaded = true;
            }
            this.messagingService.cacheThread(this.thread);

            this.refreshTimeout = setTimeout(this.loadMessages.bind(this), 5 * 1000);
            if (this.thread.last_message.seen_at == null && this.thread.last_message.from_id !== this.me.id) {
                this.requests.messaging.markMessageAsSeen(this.me, this.thread, this.thread.last_message).then(message => {
                    if (this.thread.last_message.id === message.id) {
                        this.thread.last_message = message;
                        this.messagingService.cacheThread(this.thread);
                    }
                });
            }
        });
    }

    /**
     * Resets the scroll to be on the bottom
     */
    resetScroll() {
        setTimeout(() => {
            const messagesWrapper = document.getElementById('messages');
            if (messagesWrapper) {
                messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
            }
        }, 1);
    }

    /**
     * Gets the thumbnail style for a message
     * @param message
     */
    thumbnailStyle(message: Message) {
        const fromUser = this.thread.users.find(user => {
            return user.id === message.from_id;
        });
        // You can add any custom thumbnails based on the from user here
        return fromUser ? {} : {};
    }

    /**
     * Sets the content of the currently entered message
     */
    setEnteredMessage() {
        this.enteredMessage = this.messageInput.nativeElement.value;
    }

    /**
     * Sends the message to the server
     */
    sendMessage() {
        this.requests.messaging.createMessage(this.me, this.thread, this.enteredMessage).then(message => {
            this.thread.last_message = message;
            this.enteredMessage = '';
            this.messageInput.nativeElement.value = '';
            this.messages.push(message);
            this.messagingService.cacheThread(this.thread);
            this.resetScroll();
        });
    }
}
