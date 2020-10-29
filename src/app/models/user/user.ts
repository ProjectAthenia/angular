import {BaseModel} from '../base-model';
import {Relation} from '../relation';
import {Subscription} from '../subscription/subscription';
import {OrganizationManager} from '../organization/organization-manager';
import Entity from '../entity';

/**
 * Used as a data wrapper for our user model
 */
export class User extends Entity {

    /**
     * The name the user entered upon sign up
     */
    name: string;

    /**
     * The email address of the user
     */
    email: string;

    /**
     * Information the user has entered about them self
     */
    about_me: string;

    /**
     * Whether or not this user allows other users to add them
     */
    allow_users_to_add_me: boolean;

    /**
     * Whether or not this user wants to receive push notifications
     */
    receive_push_notifications: boolean;

    /**
     * All organization managers on this user
     */
    organization_managers: OrganizationManager[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization_managers: new Relation('array', OrganizationManager),
        });
    }

    /**
     * The base api route
     */
    baseRoute(): string {
        return 'users';
    }
}
