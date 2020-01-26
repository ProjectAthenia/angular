import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthManagerService} from '../../services/auth-manager/auth-manager.service';

@Component({
  selector: 'app-logged-in-header',
  templateUrl: './logged-in-header.component.html',
  styleUrls: ['./logged-in-header.component.scss']
})
export class LoggedInHeaderComponent {

  /**
   * Default Constructor
   * @param router
   * @param authManagerService
   */
  constructor(private router: Router,
              private authManagerService: AuthManagerService) {
  }

  /**
   * Goes to the home page
   */
  goTo(url: string) {
    this.router.navigateByUrl(url).catch(console.error);
  }

  /**
   * Runs the logout
   */
  logout() {
    this.authManagerService.logOut();
  }
}
