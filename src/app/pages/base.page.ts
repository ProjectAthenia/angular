import {environment} from '../../environments/environment';
import {User} from '../models/user/user';

export class BasePage {

  /**
   * Gets the branding name
   */
  getBrandingName(): string {
    return environment.app_name;
  }

  /**
   * Gets the branding image url
   */
  getBrandingImageUrl(): string {
    return environment.branding_image_url;
  }

  /**
   * Returns the profile image style object for the associated user
   */
  profileImageStyle(user: User) {
    // Set a custom profile image here
    return user ? {} : {};
  }
}
