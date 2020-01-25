import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/data-services/user.service';
import {User} from '../../models/user/user';
import {RequestsService} from '../../services/requests/requests.service';
import {Contact} from '../../models/user/contact';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  /**
   * The logged in user
   */
  user: User;

  /**
   * All requests currently pending for the user
   */
  pendingRequests: Contact[];

  /**
   * All existing contacts
   */
  contacts: Contact[] = [];

  /**
   * Default Constructor
   * @param router
   * @param location
   * @param toastController
   * @param userService
   * @param requests
   */
  constructor(private router: Router,
              private location: Location,
              private toastController: ToastrService,
              private userService: UserService,
              private requests: RequestsService) {
  }

  /**
   * Takes care of setting up our form properly
   */
  ngOnInit() {

    this.user = this.userService.getMe();

    // This should never happen, but just in case
    if (this.user == null) {
      this.location.back();
      this.toastController.error('Error Loading User');

      return;
    }

    this.requests.social.loadContacts(this.user, true).then(contacts => {
      this.pendingRequests = contacts.filter(request => {
        return request.confirmed_at == null && request.denied_at == null &&
          request.requested_id === this.user.id;
      });
      this.contacts = contacts.filter(contact => {
        return contact.confirmed_at && !contact.denied_at;
      });
      console.log('contacts', this.contacts);
      this.userService.storeContacts(contacts);
    });
  }

  /**
   * Gets the user that the logged in user is related to
   * @param contact
   */
  getOtherContactUser(contact: Contact): User {
    return contact.initiated_by_id === this.user.id ?
      contact.requested : contact.initiated_by;
  }

  /**
   * Takes us to a user
   * @param contact
   */
  goToUser(contact: Contact) {
    const user = this.getOtherContactUser(contact);
    this.userService.cacheUser(user);
    this.router.navigateByUrl('/user/' + user.id).catch(console.error);
  }

  /**
   * Gets the name for a contact
   * @param contact
   */
  getContactUserName(contact: Contact): string {
    const user = this.getOtherContactUser(contact);
    return user.name;
  }

  /**
   * Takes us to the message page
   * @param contact
   */
  messageUser(contact: Contact) {
    const user = this.getOtherContactUser(contact);
    this.userService.cacheUser(user);
    this.router.navigateByUrl('/user/' + user.id + '/message').catch(console.error);
  }

  /**
   * Removes a pending request from the current requests
   * @param contact
   */
  removePendingRequest(contact: Contact) {
    this.pendingRequests = this.pendingRequests.filter(request => {
      return request.id !== contact.id;
    });
  }

  /**
   * Denies a connect request
   */
  deny(contact: Contact) {
    this.removePendingRequest(contact);
    this.requests.social.denyContact(this.user, contact, false).then(updated => {
      this.userService.storeContacts([updated]);
    });
  }

  /**
   * Denies a connect request
   */
  confirm(contact: Contact) {
    this.removePendingRequest(contact);
    this.contacts.push(contact);
    this.requests.social.confirmContact(this.user, contact, false).then(updated => {
      this.userService.storeContacts([updated]);
    });
  }

  /**
   * Returns the profile image style object for the associated user
   */
  profileImageStyle() {
    // Set a custom profile image here
    return this.user ? {} : {};
  }
}
