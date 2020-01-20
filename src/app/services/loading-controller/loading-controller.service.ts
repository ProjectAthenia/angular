import {Injectable} from "@angular/core";

/**
 * Used to manage the loading indicator
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingControllerService {

  /**
   * Whether or not the loading indicator is currently being shown
   */
  currentlyShown = false;

  /**
   * Shows the loading indicator
   */
  show() {
    this.currentlyShown = true;
  }

  /**
   * Hides the loading indicator
   */
  hide() {
    this.currentlyShown = false;
  }
}
