import {Component, OnInit} from '@angular/core';
import {BasePage} from '../base.page';
import {RequestsService} from '../../services/requests/requests.service';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../models/user/user';
import {UserService} from '../../services/data-services/user.service';

/**
 * Main home page of the app
 */
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage extends BasePage implements OnInit {

    /**
     * The logged in user
     */
    private me: User;

    /**
     * Default constructor
     * @param requests
     * @param userService
     * @param toastController
     */
    constructor(private requests: RequestsService,
                private userService: UserService,
                private toastController: ToastrService) {
        super();
    }

    /**
     * Run the initial load
     */
    ngOnInit(): void {
        this.requests.auth.loadInitialInformation().then(user => {
            this.me = user;
            this.userService.storeMe(this.me);
        }).catch(() => {
            this.toastController.error('Unable to load your information');
        });
    }
}
