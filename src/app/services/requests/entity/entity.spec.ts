import {User} from "../../../models/user/user";
import {PaymentMethod} from '../../../models/payment/payment-method';
import EntityRequests from './entity';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import RequestHandlerServiceMock from '../../request-handler/request-handler.service.mock';
import {Asset} from '../../../models/asset';

describe('Test the auth requests', () => {
    let requestHandler : RequestHandlerService;
    let entityRequests : EntityRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerServiceMock();
        entityRequests = new EntityRequests(requestHandler);
    });

    it('Creates a request for creating a payment method properly', async () => {

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
            identifier: '4242',
        }));
        const user = new User({
            id: 4531,
        });
        const result = await entityRequests.createPaymentMethod(user, 'token');
        expect(result.id).toBe(324);
        expect(result.constructor).toBe(PaymentMethod);
    });

    it('Creates a request for uploading a profile image properly', async () => {

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
            url: 'http://something.com/something.jpg',
        }));
        const user = new User({id: 324435});
        const result = await entityRequests.uploadProfileImage(user, 'some content');
        expect(result.constructor).toBe(Asset);
        expect(result.id).toBe(324);
    });

    it('Creates a request for uploading an asset properly', async () => {

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            id: 324,
            url: 'http://something.com/something.jpg',
        }));
        const user = new User({id: 324435});
        const result = await entityRequests.uploadProfileImage(user, 'some content');
        expect(result.constructor).toBe(Asset);
        expect(result.id).toBe(324);
    });
});
