import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user/user';
import {UserService} from '../../services/data-services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RequestsService} from '../../services/requests/requests.service';
import {Contact} from '../../models/user/contact';
import vCardsJS from 'vcards-js';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
    selector: 'app-user',
    templateUrl: './user.page.html',
    styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

    /**
     * The logged in user
     */
    me: User;

    /**
     * The form object that helps us validate the sign in form
     */
    user: User;

    /**
     * The contact between the logged in user if it exists
     */
    contact: Contact = null;

    /**
     * boolean flag for whether or not the contact has been loaded yet
     */
    contactLoaded = false;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * The about me lines of the user
     */
    userAboutLines = [];

    /**
     * Default Constructor
     * @param route
     * @param toastController
     * @param requests
     * @param location
     * @param router
     * @param userService
     */
    constructor(private route: ActivatedRoute,
                private toastController: ToastrService,
                private requests: RequestsService,
                private location: Location,
                private router: Router,
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
                    this.completeLoad(loadedUser);
                }).catch(error => {
                    this.location.back();
                    this.toastController.error('Error Loading User');
                });
            } else {
                this.completeLoad(user);
            }
        }).catch(error => {
            this.location.back();
            this.toastController.error('Error Loading User');
        });
    }

    /**
     * Finalizes the load once we have a user model
     */
    completeLoad(user: User) {
        this.user = user;
        this.loadContact();
        this.userAboutLines = this.user.about_me ? this.user.about_me.split('\n') : [];
    }

    /**
     * Loads the most relevant contact
     */
    loadContact() {

        this.userService.findContacts(this.user).then(contacts => {
            if (contacts.length === 0 && !this.contactLoaded) {
                this.requests.social.loadContacts(this.me).then(newContacts => {
                    newContacts.forEach(contact => this.userService.storeContact(contact));
                    this.contactLoaded = true;
                    this.loadContact();
                });
            } else {
                contacts = contacts.sort((contactA, contactB) => {
                    return contactA.id > contactB.id ? -1 : 1;
                });

                this.contactLoaded = true;
                this.contact = contacts[0];
            }
        });
    }

    /**
     * Returns true if this profile is the logged in user
     */
    isMe(): boolean {
        return this.me && this.user ? this.me.id === this.user.id : true;
    }

    /**
     * Takes us to the user properly
     * @param user
     */
    goToUser(user: User) {
        this.router.navigateByUrl('/user/' + user.id + '/message').catch(console.error);
    }

    /**
     * Creates the initial connect request
     */
    connect() {
        this.requests.social.createContact(this.me, this.user).then(contact => {
            this.userService.storeContact(contact);
            this.contact = contact;
        });
    }

    /**
     * Denies a connect request
     */
    deny() {
        this.requests.social.denyContact(this.me, this.contact).then(contact => {
            this.userService.storeContact(contact);
            this.contact = contact;
        });
    }

    /**
     * Denies a connect request
     */
    confirm() {
        this.requests.social.confirmContact(this.me, this.contact).then(contact => {
            this.userService.storeContact(contact);
            this.contact = contact;
        });
    }

    /**
     * Returns true if the connection has been confirmed
     */
    isConnected() {
        return this.contact && this.contact.confirmed_at;
    }

    /**
     * Exports the contact to vcf, and then opens the contact for the user to choose what to do
     */
    exportContact() {

        const card = vCardsJS();
        let nameParts = this.user.name.split(' ');
        card.firstName = nameParts[0];
        nameParts.shift();
        card.lastName = nameParts.join(' ');
        card.email = this.user.email;

        // Add custom fields here

        const fileName = 'member-' + this.user.id + '.vcf';

        const link = document.createElement('a');
        link.download = fileName;
        const blob = new Blob([card.getFormattedString()], {type: 'text/x-vcard'});
        link.href = window.URL.createObjectURL(blob);
        link.click();
    }

    /**
     * Tells us whether or not the logged in user can initiate a request
     */
    canConnect() {
        if (this.contactLoaded && this.user.allow_users_to_add_me) {
            return (!this.contact || this.contact.denied_at != null);
        }
        return false;
    }

    /**
     * Tells us whether or not there is a pending request initiated by us
     */
    contactIsPendingOtherUser() {
        if (this.contactLoaded && this.contact) {
            return this.contact.initiated_by_id === this.me.id && !this.contact.confirmed_at && !this.contact.denied_at;
        }
        return false;
    }

    /**
     * Tells us whether or not there is a pending request initiated by us
     */
    contactIsPendingMyAction() {
        if (this.contactLoaded && this.contact) {
            return this.contact.requested_id === this.me.id && !this.contact.confirmed_at && !this.contact.denied_at;
        }
        return false;
    }

    /**
     * Returns the profile image style object for the associated user
     */
    profileImageStyle() {
        // Set a custom profile image here
        return this.user ? {} : {};
    }
}
