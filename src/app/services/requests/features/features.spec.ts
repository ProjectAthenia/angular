import Features from './features';
import {Feature} from '../../../models/feature';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import RequestHandlerServiceMock from '../../request-handler/request-handler.service.mock';

describe('Test the feature requests', () => {
    let requestHandler : RequestHandlerService;
    let features : Features;

    beforeEach(() => {
        requestHandler = new RequestHandlerServiceMock();
        features = new Features(requestHandler);
    });

    it('Creates a request for fetching features properly', async () => {

        spyOn(requestHandler, 'get').and.returnValue(Promise.resolve({
            data: [
                {
                    id: 14,
                    name: 'Feature 1',
                },
                {
                    id: 12,
                    name: 'Feature 2',
                },
            ],
        }));
        const result = await features.fetchFeatures();
        expect(result[0].constructor).toBe(Feature);
        expect(result[1].constructor).toBe(Feature);
    });
});
