import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {StorageService} from '../storage/storage.service';
import {AuthManagerService} from '../auth-manager/auth-manager.service';
import {RequestHandlerService} from './request-handler.service';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {LoadingControllerService} from '../loading-controller/loading-controller.service';

describe('Test Request Handler provider', () => {

    let http: HttpClient;
    let storageService: StorageService;
    let authService: AuthManagerService;
    let toast: ToastrService;
    let requestHandlerProvider: RequestHandlerService;

    beforeEach(() => {
        http = new HttpClient({handle: null});
        storageService = new StorageService();
        authService = new AuthManagerService(storageService);

        requestHandlerProvider = new RequestHandlerService(http, storageService, authService, new LoadingControllerService(), toast);
    });


    it('Make sure the buildUrl function works in live mode', async () => {

        environment.api_url = 'http://test.test';

        let result = requestHandlerProvider.buildUrl('');

        expect(result).toBe('http://test.test');
    });

    it('Make sure the refreshToken function is called properly', async () => {
        spyOn(storageService, 'loadAuthToken').and.returnValue('old token');
        spyOn(http, 'post').and.returnValue(
            of({
                token: 'a new token',
            })
        );
        spyOn(storageService, 'saveAuthToken');

        await requestHandlerProvider.refreshToken();

        expect(http.post).toHaveBeenCalled();
        expect(storageService.saveAuthToken).toHaveBeenCalledWith('a new token');
    });

    it('Make sure that requires auth loads the auth token when it does not need to be refreshed', async () => {
        spyOn(authService, 'needsRefresh').and.returnValue(false);
        spyOn(storageService, 'loadAuthToken').and.returnValue('a token');

        await requestHandlerProvider.requiresAuth();

        expect(authService.needsRefresh).toHaveBeenCalled();
        expect(storageService.loadAuthToken).toHaveBeenCalled();

        expect(requestHandlerProvider.authToken).toBe('a token');
    });

    it('Make sure that requires auth sends the logout event on loadAuthToken failure', async () => {
        spyOn(authService, 'needsRefresh').and.returnValue(false);
        spyOn(storageService, 'loadAuthToken').and.returnValue(null);
        spyOn(authService, 'logOut');

        await requestHandlerProvider.requiresAuth().then(() => {
            throw new Error('Promise not rejected');
        }).catch(() => {

            expect(authService.needsRefresh).toHaveBeenCalled();
            expect(storageService.loadAuthToken).toHaveBeenCalled();
            expect(authService.logOut).toHaveBeenCalled();
        });
    });

    it('Make sure that requires auth attempts to refresh the token when the token is expired', async () => {
        spyOn(authService, 'needsRefresh').and.returnValue(true);

        // refresh request
        spyOn(http, 'post').and.returnValue(
            of({
                token: 'a new token',
            }));
        spyOn(storageService, 'saveAuthToken');

        spyOn(storageService, 'loadAuthToken').and.returnValue('a new token');

        await requestHandlerProvider.requiresAuth();

        expect(authService.needsRefresh).toHaveBeenCalled();
        expect(storageService.loadAuthToken).toHaveBeenCalled();
        expect(http.post).toHaveBeenCalled();
        expect(storageService.saveAuthToken).toHaveBeenCalledWith('a new token');

        expect(requestHandlerProvider.authToken).toBe('a new token');
    });
});
