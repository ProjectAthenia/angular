import {Injectable} from "@angular/core";
import {StorageService} from "../storage/storage.service";

/**
 * Used to manage the authentication of the app
 */
@Injectable({
  providedIn: 'root'
})
export class AuthManagerService {

  /**
   * The refresh rate for when to refresh the token
   */
  static TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000;

  /**
   * Default Constructor
   * @param storageService
   */
  constructor(private storageService: StorageService) {
  }

  /**
   * Checks if the last retrieved token needs to be refreshed
   */
  needsRefresh(): boolean {
    const receivedAt = this.storageService.loadReceivedAt();
    return receivedAt + AuthManagerService.TOKEN_REFRESH_INTERVAL < Date.now();
  }
}
