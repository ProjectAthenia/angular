import { Component } from '@angular/core';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';
import {Location} from '@angular/common';
import {StorageService} from './services/storage/storage.service';

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
   * @param location
   */
  constructor(private authManagerService: AuthManagerService,
              private storageService: StorageService,
              private location: Location) {
    this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
    const authToken = this.storageService.loadAuthToken();
    if (!authToken) {
      this.location.go('/sign-in');
    } else {
      this.location.go('/home');
    }
  }

  /**
   * Handles our logout properly
   */
  handleLogout() {
    // TODO do something
  }
}
