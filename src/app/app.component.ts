import { Component } from '@angular/core';
import {AuthManagerService} from './services/auth-manager/auth-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'athenia';

  constructor(private authManagerService: AuthManagerService) {
    this.authManagerService.getLogoutObservable().subscribe(() => this.handleLogout());
  }

  /**
   * Handles our logout properly
   */
  handleLogout() {
    // TODO do something
  }
}
