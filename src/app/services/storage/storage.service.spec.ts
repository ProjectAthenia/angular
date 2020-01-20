import {StorageProvider} from "./storage.service";

describe('Test Storage provider helper', () => {

    let storageProvider : StorageProvider;

    beforeEach(() => {
        storageProvider = new StorageProvider();
    });

    it('should load the auth token with key auth_token', async () => {
        spyOn(window.localStorage, 'getItem').and.returnValue(
           'a token'
        );

        const result = storageProvider.loadAuthToken();

        expect(window.localStorage.getItem).toHaveBeenCalledWith('auth_token');
        expect(result).toBe('a token');
    });

    it('should load the received at date with key received_at', async () => {
        spyOn(window.localStorage, 'getItem').and.returnValue(           '123');

        const result = storageProvider.loadReceivedAt();

        expect(window.localStorage.getItem).toHaveBeenCalledWith('received_at');
        expect(result).toBe(123);
    });

    it('should load the logged in user id', async () => {
        spyOn(window.localStorage, 'getItem').and.returnValue('325');

        const result = storageProvider.loadLoggedInUserId();

        expect(window.localStorage.getItem).toHaveBeenCalledWith('user_id');
        expect(result).toBe(325);
    });

    it('should save the received at and token ', async () => {
        spyOn(window.localStorage, 'setItem').and.callThrough();

        spyOn(Date, 'now').and.returnValue(23154);

        storageProvider.saveAuthToken('a token');

        expect(window.localStorage.setItem).toHaveBeenCalledWith('auth_token', 'a token');
        expect(window.localStorage.setItem).toHaveBeenCalledWith('received_at', '23154');
    });

    it('should save the logged in user id', async () => {
        spyOn(window.localStorage, 'setItem').and.callThrough();

        storageProvider.saveLoggedInUserId(43);

        expect(window.localStorage.setItem).toHaveBeenCalledWith('user_id', '43');
    });

    it('should call the parent clear when log out is called', async () => {
        spyOn(window.localStorage, 'clear').and.callThrough();

        storageProvider.logOut();

        expect(window.localStorage.clear).toHaveBeenCalled();
    });
});
