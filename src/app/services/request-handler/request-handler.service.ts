import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {AuthManagerService} from '../auth-manager/auth-manager.service';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Injectable()
export class RequestHandlerService {

  /**
   * The total amount of loads being ran throughout the app
   * @type {number}
   */
  static LOAD_INDICATOR_COUNT = 0;

  /**
   * The current auth token, for any requests needing authorization
   * @type {string|null}
   */
  authToken: string = null;

  /**
   * The current loading indicator
   */
  loadingIndicator = null;

  /**
   * Whether or not the token is currently refreshing
   */
  refreshRequest: Promise<any> = null;

  /**
   * Default constructor for this provider
   * @param http
   * @param storageService
   * @param authManager
   * @param loadingController
   * @param toastrService
   */
  constructor(private http: HttpClient,
              private storageService: StorageService,
              private authManager: AuthManagerService,
//               private loadingController: LoadingController
              private toastrService: ToastrService) {
  }

  /**
   * builds the url based on whether or not the app is in test mode
   * @param route
   */
  buildUrl(route: string): string {
    return environment.api_url + route;
  }

  /**
   * Refreshes a token properly
   */
  async refreshToken(): Promise<any> {

    try {
      if (this.refreshRequest == null) {
        this.authToken = this.storageService.loadAuthToken();
        this.refreshRequest = this.post('auth/refresh', false, false, {});
      }
      const response = await this.refreshRequest;
      this.authToken = response.token;
      this.storageService.saveAuthToken(this.authToken);
      this.refreshRequest = null;
      return Promise.resolve();
    } catch(error) {
      this.authManager.logOut();
      return Promise.reject();
    }
  }

  /**
   * Loads the auth token, and returns a promise for when the token has been loaded
   * This should be done every time we need the auth token in case it is update from somewhere else
   * @returns {Promise<void>}
   */
  async requiresAuth():  Promise<void> {
    const needsRefresh = this.authManager.needsRefresh();

    if (needsRefresh) {
      await this.refreshToken();
      return Promise.resolve();
    }
    this.authToken = this.storageService.loadAuthToken();

    if (!this.authToken) {
      this.authManager.logOut();
      return Promise.reject();
    }

    return Promise.resolve();
  }

  /**
   * Loads all headers for the request
   * @returns {any}
   */
  private headers() {
    if (this.authToken != null) {
      return {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authToken
      };
    }

    return {
      'Content-Type': 'application/json',
    };
  }

  /**
   * Takes a request object, and adds all default promise handlers to it
   * @param {Promise<HTTPResponse>} request
   * @param showLoading
   * @param customErrorHandlers
   */
  private async runRequest(request: Observable<Object>, showLoading: boolean,
                           customErrorHandlers: any = null): Promise<any> {

    return request.toPromise()
      .then(response => this.handleResponse(showLoading, response))
      .catch(error => this.handleError(showLoading, customErrorHandlers, error));
  }

  /**
   * Handles the response properly
   * @param showLoading
   * @param response
   */
  handleResponse(showLoading: boolean, response: any): Promise<any> {

    if (showLoading) {
      this.decrementLoadIndicator();
    }

    return new Promise<object> (resolve => {
      resolve(response);
    });
  }

  /**
   * Handles an http error properly
   * @param showLoading
   * @param customErrorHandlers
   * @param error
   */
  handleError(showLoading: boolean, customErrorHandlers: any, error): Promise<any> {
    if (showLoading) {
      this.decrementLoadIndicator();
    }

    if (customErrorHandlers) {
      for (const statusCode in customErrorHandlers) {
        if (error.status == statusCode) {
          customErrorHandlers[statusCode](error);

          return Promise.reject(error);
        }
      }
    }

    let message = null;
    switch (error.status) {
      case -1:
      case 0:
      case 1:
      case 3:
        message = 'Server timeout error. Please check back later.';
        console.error('Timeout Error', error);
        break;

      case 500:
        message = 'An error has occurred on our servers! If this problem persists, please contact us.';
        console.error('Server Error', error);
        break;

      case 400:
        message = 'An error has occurred! If this problem persists, please contact us.';
        console.error('Validation Error', error, error.error);
        break;

      case 401:
        RequestHandlerService.LOAD_INDICATOR_COUNT = 0;
        this.decrementLoadIndicator();
        this.authManager.logOut();
        break;

      default:
        message = 'An unknown error #' + error.status + ' has occurred. If this problem persists, please contact us.';
        console.error('Unknown Status Error', error);
        break;
    }

    if (message) {
      this.toastrService.error(message, 'Error');
    }

    return Promise.reject(error);
  }

  /**
   * Increments the loading indicator for us
   */
  private async incrementLoading() {
    if (RequestHandlerService.LOAD_INDICATOR_COUNT === 0) {
      RequestHandlerService.LOAD_INDICATOR_COUNT++;
        if (this.loadingIndicator != null) {
          this.loadingIndicator.dismiss();
          this.loadingIndicator = null;
        }
        // TODO show loading this.loadingIndicator = await this.loadingController.create({
        //     message: 'Loading...',
        //     spinner: 'dots',
        //     translucent: true,
        // });
        // this.loadingIndicator.present();
    } else {

      RequestHandlerService.LOAD_INDICATOR_COUNT++;
    }
  }

  /**
   * Lowers the load indicator amount and hides it if need be
   */
  decrementLoadIndicator() {
    if (RequestHandlerService.LOAD_INDICATOR_COUNT > 0) {
      RequestHandlerService.LOAD_INDICATOR_COUNT--;
    }

    if (RequestHandlerService.LOAD_INDICATOR_COUNT <= 0) {

     // TODO hide loading    this.loadingController.dismiss().catch(console.error);
    }
  }

  /**
   * Runs a get request on a rute
   * @param {string} route
   * @param requiresAuth
   * @param showLoading
   * @param expands
   * @param customErrorHandlers
   * @param filter
   * @param search
   * @param limit
   * @param page
   */
  async get(route: string, requiresAuth: boolean, showLoading: boolean, expands: any, customErrorHandlers: any = null,
            filter: any = null, search: any = null, limit: number = null, page: number = null): Promise<any> {

    if (showLoading) {
      await this.incrementLoading();
    }
    if (requiresAuth) {
      await this.requiresAuth();
    }
    const data = {};

    for (const expand of expands) {
      data['expand['  + expand + ']'] = '*';
    }

    if (filter) {
      for (const key of Object.keys(filter)) {
        data['filter[' + key + ']'] = filter[key];
      }
    }

    if (search) {

      for (const key of Object.keys(search)) {
        const term = search[key];
        if (term instanceof Array)  {
          for (const lookup of term) {

            data['search[' + key + '][' +  (Object.keys(data).length) + ']'] = 'like,*' + lookup + '*';
          }
        } else {
          data['search[' + key + ']'] = 'like,*' + search[key] + '*';
        }
      }
    }

    if (limit) {
      data['limit'] = limit.toString();
    }

    if (page) {
      data['page'] = page.toString();
    }

    const path = this.buildUrl(route);
    const request = this.http.get(path, {
      params: data,
      headers: this.headers(),
    });

    return this.runRequest(request, showLoading, customErrorHandlers);
  }

  /**
   * Runs a post request on route
   * @param {string} route
   * @param requiresAuth
   * @param showLoading
   * @param data
   * @param customErrorHandlers
   */
  async post(route: string, requiresAuth: boolean, showLoading: boolean,
             data: any, customErrorHandlers: any = null): Promise<any> {

    if (showLoading) {
      await this.incrementLoading();
    }
    if (requiresAuth) {
      await this.requiresAuth();
    }
    const path = this.buildUrl(route);
    const request = this.http.post(path, {
      params: data,
      headers: this.headers(),
    });

    return this.runRequest(request, showLoading, customErrorHandlers);
  }

  /**
   * Runs a patch request on route
   * @param {string} route
   * @param requiresAuth
   * @param showLoading
   * @param data
   * @param customErrorHandlers
   */
  async patch(route: string, requiresAuth: boolean, showLoading: boolean,
              data: any, customErrorHandlers: any = null): Promise<any> {

    if (showLoading) {
      await this.incrementLoading();
    }
    if (requiresAuth) {
      await this.requiresAuth();
    }
    const path = this.buildUrl(route);
    const request = this.http.patch(path, {
      params: data,
      headers: this.headers(),
    });

    return this.runRequest(request, showLoading, customErrorHandlers);
  }

  /**
   * Runs a delete request on route
   * @param {string} route
   * @param requiresAuth
   * @param showLoading
   * @param customErrorHandlers
   */
  async delete(route: string, requiresAuth: boolean, showLoading: boolean, customErrorHandlers: any = null): Promise<any> {

    if (showLoading) {
      await this.incrementLoading();
    }
    if (requiresAuth) {
      await this.requiresAuth();
    }
    const path = this.buildUrl(route);
    const request = this.http.delete(path, {
      headers: this.headers(),
    });

    return this.runRequest(request, showLoading, customErrorHandlers);
  }

  /**
   * Runs a put request on route
   * @param {string} route
   * @param requiresAuth
   * @param showLoading
   * @param data
   * @param customErrorHandlers
   */
  async put(route: string, requiresAuth: boolean, showLoading: boolean,
              data: any, customErrorHandlers: any = null): Promise<any> {

    if (showLoading) {
      await this.incrementLoading();
    }
    if (requiresAuth) {
      await this.requiresAuth();
    }
    const path = this.buildUrl(route);
    const request = this.http.put(path, {
      params: data,
      headers: this.headers(),
    });

    return this.runRequest(request, showLoading, customErrorHandlers);
  }
}
