import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {UserService} from '../../services/data-services/user.service';
import {RequestsService} from '../../services/requests/requests.service';
import {Thread} from '../../models/user/thread';
import {MessagingService} from '../../services/data-services/messaging.service';
import {Message} from '../../models/user/message';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BasePage} from '../base.page';

@Component({
    selector: 'app-threads',
    templateUrl: './threads.page.html',
    styleUrls: ['./threads.page.scss'],
})
export class ThreadsPage extends BasePage implements OnInit, OnDestroy {

  /**
   * The search bar
   */
  @ViewChild('filterBar', { static: false })
  filterBar: ElementRef;

  /**
   * The logged in user
   */
  me: User;

  /**
   * All threads that this user is apart of
   */
  threads: Thread[] = [];

  /**
   * Current visible threads based on search term
   */
  visibleThreads: Thread[] = [];

  /**
   * boolean flag for whether or not everything is all set
   */
  loaded = false;

  /**
   * The handle to the current refresh timeout
   */
  refreshTimeout: any;

  /**
   * Default Constructor
   * @param location
   * @param router
   * @param toastController
   * @param requests
   * @param messagingService
   * @param userService
   */
  constructor(private location: Location,
              private router: Router,
              private toastController: ToastrService,
              private requests: RequestsService,
              private messagingService: MessagingService,
              private userService: UserService) {
    super();
  }

  /**
   * Takes care of setting up our form properly
   */
  ngOnInit() {
    this.me = this.userService.getMe();

    // This should never happen, but just in case
    if (this.me == null) {
      this.location.back();
      this.toastController.error('Error Loading User');

      return;
    }

    this.loadThreads();
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
  loadThreads() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
    this.requests.messaging.getThreads(this.me, !this.loaded).then(threads => {
      this.threads = threads.sort((threadA, threadB) => {
        if (threadA.last_message && threadB.last_message) {
          if (threadA.last_message.created_at < threadB.last_message.created_at) {
            return 1;
          } else {
            return -1;
          }
        }
        return 0;
      });
      if (this.filterBar) {
        this.filterThreads();
      } else {
        this.visibleThreads = this.threads;
      }
      this.loaded = true;
      this.threads.forEach(thread => {
        this.messagingService.cacheThread(thread);
      });

      this.refreshTimeout = setTimeout(this.loadThreads.bind(this), 30 * 1000);
    });
  }

  /**
   * Takes us to a thread
   * @param thread
   */
  goToThread(thread: Thread) {

    let otherUser: User = null;
    thread.users.forEach(user => {
      if (user.id !== this.me.id) {
        otherUser = user;
      }
    });

    if (otherUser != null) {
      this.userService.cacheUser(otherUser);
      this.router.navigateByUrl('/user/' + otherUser.id + '/message').catch(console.error);
    }
  }

  /**
   * Gets another user in a thread
   * @param thread
   */
  getOtherUser(thread: Thread) {
    console.log('getOtherUser', thread);
    let otherUser = null;
    thread.users.forEach(user => {
      if (user.id !== this.me.id) {
        otherUser = user;
      }
    });
    console.log(otherUser);

    return otherUser;
  }

  /**
   * Gets the other username in a thread
   * @param thread
   */
  getOtherUserName(thread: Thread) {
    let userName = '';

    thread.users.forEach(user => {
      if (user.id !== this.me.id) {
        userName = user.name;
      }
    });

    return userName;
  }

  /**
   * Gets the last message sent
   * @param thread
   */
  getLastMessage(thread: Thread): Message | null {
    return thread && thread.last_message ?
      thread.last_message : null;
  }

  /**
   * Determines whether or not this message is mine or last seen by me
   * @param thread
   */
  isLastMessageMineOrSeen(thread: Thread): boolean {
    const message = this.getLastMessage(thread);

    if (message) {
      return message.from_id === this.me.id || message.seen_at != null;
    }
    return false;
  }

  /**
   * Gets the last message sent
   * @param thread
   */
  getLastMessageContent(thread: Thread) {
    const lastMessage = this.getLastMessage(thread);
    return lastMessage && lastMessage.data && lastMessage.data.body
      ? lastMessage.data.body : null;
  }

  /**
   * Filters the threads by the search term
   */
  filterThreads() {
    if (this.filterBar.nativeElement.value.length > 0) {
      this.visibleThreads = this.threads.filter(thread => {
        return this.getOtherUserName(thread).indexOf(this.filterBar.nativeElement.value) !== -1;
      });
    } else {
      this.visibleThreads = this.threads;
    }
  }

  /**
   * Gets the last message date text
   * @param thread
   */
  getLastMessageDate(thread: Thread) {
    const lastMessage = this.getLastMessage(thread);
    return lastMessage && lastMessage.created_at ? lastMessage.formatDate() : null;
  }
}
