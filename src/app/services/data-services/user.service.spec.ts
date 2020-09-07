import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {User} from '../../models/user/user';
import {RequestsService} from '../requests/requests.service';
import RequestsServiceMock from '../requests/requests.service.mock';

describe('UserService', () => {
    const requestsProvider: RequestsService = new RequestsServiceMock();
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {provide: RequestsService, useValue: requestsProvider},
        ]
    }));

    it('should be created', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
    });

    it('should cache the logged in user properly', async () => {
        const service: UserService = TestBed.get(UserService);

        service.storeMe(new User({}));
        expect(await service.getMe()).toBeTruthy();
    });

    it('should cache a user properly', () => {
        const service: UserService = TestBed.get(UserService);
        service.cacheUser(new User({
            id: 45252,
        }));
        expect(service.loadedUsers[45252]).toBeTruthy();
    });

    it('should return null when a user is not found', () => {
        const service: UserService = TestBed.get(UserService);

        const result = service.getUser(45252);
        expect(result).toBeNull();
    });

    it('should get a user properly', () => {
        const service: UserService = TestBed.get(UserService);

        const user = new User({
            id: 45252,
        });
        service.cacheUser(user);

        const result = service.getUser(45252);
        expect(user).toBe(result);
    });
});
