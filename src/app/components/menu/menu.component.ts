import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthManagerService} from '../../services/auth-manager/auth-manager.service';
import {environment} from '../../../environments/environment';
import {StorageService} from '../../services/storage/storage.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent
{
    /**
     * Default Constructor
     * @param router
     * @param storageService
     * @param authManagerService
     */
    constructor(private router: Router,
                private storageService: StorageService,
                private authManagerService: AuthManagerService)
    {}

    /**
     * Goes to the home page
     */
    goTo(url: string)
    {
        this.router.navigateByUrl(url).catch(console.error);
    }

    /**
     * Runs the logout
     */
    logout()
    {
        this.authManagerService.logOut();
    }

    /**
     * Tells us whether or not this particular app has the social media components enabled
     */
    isSocialMediaEnabled()
    {
        return this.isLoggedIn() && environment.social_media_enabled;
    }

    /**
     * Tells us whether or not this particular app has individual subscriptions enabled
     */
    areSubscriptionsEnabled()
    {
        return this.isLoggedIn() && environment.subscriptions_enabled;
    }

    /**
     * Tells us whether or not this particular app has the organization components enabled
     */
    areOrganizationsEnabled()
    {
        return this.isLoggedIn() && environment.organizations_enabled;
    }

    /**
     * Tells us whether or not the user is currently logged in
     */
    isLoggedIn()
    {
        return !isNaN(this.storageService.loadLoggedInUserId());
    }
}
