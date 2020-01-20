import {AuthManagerService} from "../auth-manager/auth-manager.service";
import {StorageService} from "../storage/storage.service";
import {HttpClient} from '@angular/common/http';
import {RequestHandlerService} from './request-handler.service';

/**
 * Class for mocking the request handler provider
 */
export default class RequestHandlerServiceMock extends RequestHandlerService {

  constructor() {
    super(
      new HttpClient({handle : null}),
      new StorageService(),
      new AuthManagerService(new StorageService()),
      null,
    );
  }

  requiresAuth(): Promise<void> {
    this.authToken = 'a token';
    return Promise.resolve();
  }

  get(route: string, showLoading: boolean, expands: any, success: any = null, customErrorHandlers: any = null, filter: any = null, search: any = null, limit: number = null) {
    return Promise.resolve();
  }

  post(route: string, showLoading: boolean, data: any, success: any = null, customErrorHandlers: any = null) {
    return Promise.resolve();
  }

  put(route: string, showLoading: boolean, data: any, success: any = null, customErrorHandlers: any = null) {
    return Promise.resolve();
  }
}
