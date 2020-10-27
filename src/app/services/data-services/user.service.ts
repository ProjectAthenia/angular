import {Injectable} from '@angular/core';
import {User} from '../../models/user/user';
import {Contact} from '../../models/user/contact';
import {RequestsService} from '../requests/requests.service';
import {Observable, Subscriber} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    /**
     * The current logged in user
     */
    me: User;

    /**
     * All loaded users in the system
     */
    loadedUsers: any = {};

    /**
     * The contacts that have been loaded
     */
    contacts: Contact[] = [];

    /**
     * Whether or not the user's contacts have loaded
     */
    contactsLoaded = false;

    /**
     * The observer for listening to contact change events
     */
    readonly contactChangeObserver: Observable<Contact>;

    /**
     * The subscriber to listen for contact chang events
     */
    private contactChangeSubscribers: Subscriber<Contact>[] = [];

    /**
     * Default constructor
     * @param requests
     */
    constructor(private requests: RequestsService)
    {
        this.contactChangeObserver = new Observable((subscriber) => {
            this.contactChangeSubscribers.push(subscriber);
        });
    }

    /**
     * Stores the logged in user for us
     * @param user
     */
    storeMe(user: User)
    {
        this.me = user;
    }

    /**
     * Gets the current logged in user
     */
    getMe(): Promise<User>
    {
        return this.me ? Promise.resolve(this.me) :
            this.requests.auth.loadInitialInformation().then(me => {
                this.storeMe(me);
                return Promise.resolve(me);
            });
    }

    /**
     * Sets a user object into cache
     * @param user
     */
    cacheUser(user: User)
    {
        this.loadedUsers[user.id] = user;
    }

    /**
     * Gets a user by an id
     * @param id
     */
    getUser(id: number): User | null
    {
        return this.loadedUsers[id] ? this.loadedUsers[id] : null;
    }

    /**
     * Gets the observer for the auth refreshed events
     */
    getContactChangeObserver(): Observable<Contact>
    {
        return this.contactChangeObserver;
    }

    /**
     * Stores a list of contacts into cache
     * @param contacts
     */
    storeContacts(contacts: Contact[])
    {
        contacts.forEach(contact => this.storeContact(contact));
    }

    /**
     * Stores a list of contacts into cache
     * @param contact
     */
    storeContact(contact: Contact)
    {
        if (this.contacts.find(oldContact => contact.id === oldContact.id)) {
            this.contacts = this.contacts.map(oldContact => {
                return oldContact.id === contact.id ? contact : oldContact;
            });
        } else {
            this.contacts.push(contact);
        }
        this.contactChangeSubscribers.forEach(subscriber => {
            subscriber.next(contact);
        });
    }

    /**
     * finds all contacts related to a user
     * @param user
     */
    findContacts(user: User): Promise<Contact[]>
    {
        if (this.contactsLoaded) {
            return Promise.resolve(this.filterForContacts(user));
        } else {
            return this.requests.social.loadContacts(this.me).then(contacts => {
                this.contacts = contacts;
                return Promise.resolve(this.filterForContacts(user));
            });
        }
    }

    /**
     * Filters our logged in user's contacts for any contacts with the passed in user
     * @param user
     */
    private filterForContacts(user: User): Contact[]
    {
        return this.contacts.filter(contact => {
            return contact.initiated_by_id === user.id || contact.requested_id === user.id;
        });
    }
}
