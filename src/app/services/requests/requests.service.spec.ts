import {RequestsService} from './requests.service';
import RequestHandlerProviderMock from '../request-handler/request-handler.service.mock';
import Auth from './auth/auth';
import Social from './social/social';
import Messaging from './messaging/messaging';

describe('Test the requests provider', () => {
    it('Make sure that the requests are built properly', () => {
        const requestsProvider = new RequestsService(new RequestHandlerProviderMock());

        expect(requestsProvider.auth.constructor).toBe(Auth);
        expect(requestsProvider.social.constructor).toBe(Social);
        expect(requestsProvider.messaging.constructor).toBe(Messaging);
    });
});
