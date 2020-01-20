import {StorageProvider} from '../storage/storage.service';
import {AuthManagerProvider} from './auth-manager.service';

describe('Test the auth manager provider', () => {

    let storageProvider: StorageProvider;
    let authManager: AuthManagerProvider;

    beforeEach(() => {
        storageProvider = new StorageProvider();
        authManager = new AuthManagerProvider(storageProvider);
    });

    it('Makes sure that the needs refresh function returns false when the auth token is within the last 55 minutes', async() => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Date.now() - (5 * 60 * 1000));

        const result = authManager.needsRefresh();

        expect(result).toBeFalsy();
    });

    it('Makes sure that the needs refresh function returns true when the auth token is older then 55 minutes', async() => {

        spyOn(storageProvider, 'loadReceivedAt').and.returnValue(Date.now() - (56 * 60 * 1000));

        const result = authManager.needsRefresh();

        expect(result).toBeTruthy();
    });
});
