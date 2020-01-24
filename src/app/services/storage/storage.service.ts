import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  /**
   * Loads the authentication token from storage
   */
  loadAuthToken(): string {
    return window.localStorage.getItem('auth_token');
  }

  /**
   * Loads the date time for when this was last received at
   */
  loadReceivedAt(): number {
    return parseInt(window.localStorage.getItem('received_at'));
  }

  /**
   * Loads the user id that is logged into the app
   */
  loadLoggedInUserId(): number {
    return parseInt(window.localStorage.getItem('user_id'));
  }

  /**
   * Handler for saving the auth token back into storage
   * @param token
   */
  saveAuthToken(token) {
    window.localStorage.setItem('auth_token', token);
    window.localStorage.setItem('received_at', "" + Date.now());
  }

  /**
   * saves the logged in user id for the terminal
   *
   * @param userId
   */
  saveLoggedInUserId(userId: number) {
    window.localStorage.setItem('user_id', "" + userId);
  }

  /**
   * Removes all keys from storage
   */
  logOut() {
    window.localStorage.clear();
  }

  // Put all custom storage variables below
}
