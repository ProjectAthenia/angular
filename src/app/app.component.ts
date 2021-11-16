import {Component} from '@angular/core';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {StorageService} from './services/storage/storage.service';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    /**
     * Whether or not the user is currently logged in
     */
    static LOGGED_IN = false;

    /**
     * Default Constructor
     * @param authManagerService
     * @param storageService
     * @param router
     */
    constructor(private authManagerService: AuthManagerService,
                private storageService: StorageService,
                private router: Router)
    {
        this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
        if (environment.auth_required) {
            const authToken = this.storageService.loadAuthToken();
            if (!authToken) {
                this.router.navigateByUrl('/sign-in').catch(console.error);
            }
        }
    }

    /**
     * Handles our logout properly
     */
    handleLogout()
    {
        const url = environment.auth_required ? '/sign-in' : '/';
        this.router.navigateByUrl(url).catch(console.error);
    }
}
