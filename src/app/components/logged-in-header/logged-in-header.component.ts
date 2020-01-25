import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-logged-in-header',
    templateUrl: './logged-in-header.component.html',
    styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent {

    /**
     * Default Constructor
     * @param router
     */
    constructor(private router: Router)
    {}

    /**
     * Goes to the home page
     */
    goTo(url: string) {
        this.router.navigateByUrl(url).catch(console.error);
    }
}
