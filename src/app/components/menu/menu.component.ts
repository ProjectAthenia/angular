import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthManagerService} from '../../services/auth-manager/auth-manager.service';
import {environment} from '../../../environments/environment';

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
     * @param authManagerService
     */
    constructor(private router: Router,
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
        return environment.social_media_enabled;
    }

    /**
     * Tells us whether or not this particular app has individual subscriptions enabled
     */
    areSubscriptionsEnabled()
    {
        return environment.subscriptions_enabled;
    }

    /**
     * Tells us whether or not this particular app has the organization components enabled
     */
    areOrganizationsEnabled()
    {
        return environment.organizations_enabled;
    }
}
