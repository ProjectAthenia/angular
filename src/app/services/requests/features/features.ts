import {Feature} from '../../../models/feature';
import {RequestHandlerService} from '../../request-handler/request-handler.service';

/**
 * All requests needed for handling subscriptions within the app
 */
export default class Features
{
    /**
     * The features if they are loaded
     */
    features: Feature[] = null;

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerService)
    {}

    /**
     * Fetches all membership plans
     */
    async fetchFeatures(): Promise<Feature[]>
    {
        if (this.features) {
            return Promise.resolve(this.features);
        }

        return this.requestHandler
            .get('features', true, true, [], {}, {}, {}, 100)
            .then(response => {
                    const data = response.data;
                    const features = [];
                    data.forEach(entry => {
                        features.push(new Feature(entry));
                    });
                    return Promise.resolve(features);
                }
            );
    }
}
