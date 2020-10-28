import {User} from '../../../models/user/user';
import {PaymentMethod} from '../../../models/payment/payment-method';
import OrganizationRequests from './organization';
import {Organization} from '../../../models/organization/organization';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import RequestHandlerServiceMock from '../../request-handler/request-handler.service.mock';

describe('Test the auth requests', () => {
    let requestHandler : RequestHandlerService;
    let organizationRequests : OrganizationRequests;

    beforeEach(() => {
        requestHandler = new RequestHandlerServiceMock();
        organizationRequests = new OrganizationRequests(requestHandler);
    });

    it('Creates a request properly for creating an organization', async () => {
        const name = 'An Organization';

        spyOn(requestHandler, 'post').and.returnValue(Promise.resolve({
            name: name
        }));
        let result = await organizationRequests.createOrganization(name);
        expect(requestHandler.post).toHaveBeenCalledWith(
            'organizations',
            true,
            true,
            {name: name},
        );
        expect(result.constructor).toBe(Organization);
    });
});
