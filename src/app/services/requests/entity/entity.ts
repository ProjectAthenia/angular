import {PaymentMethod} from '../../../models/payment/payment-method';
import IsEntity from '../../../models/contracts/is-entity';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import {Asset} from '../../../models/asset';

/**
 * All requests needed for handling authentication within the app
 */
export default class EntityRequests {

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerService) {
    }

    /**
     * Creates a payment method for a user
     * @param entity
     * @param stripeToken
     */
    async createPaymentMethod(entity: IsEntity, stripeToken: string): Promise<PaymentMethod> {
        return this.requestHandler.post(entity.baseRoute() + '/' + entity.id + '/payment-methods', true, true, {
            token: stripeToken,
        }).then (result => {
            return Promise.resolve(new PaymentMethod(result));
        });
    }

    /**
     * Runes the upload request, the file contents should be a base 64 encoded string
     *
     * @param entity
     * @param fileContents
     */
    async uploadProfileImage(entity: IsEntity, fileContents: string): Promise<Asset> {
        return this.requestHandler.post(entity.baseRoute() + '/' + entity.id + '/profile-images', true, false, {
            file_contents: fileContents,
        }).then(response => {
            return Promise.resolve(new Asset(response));
        });
    }



    /**
     * Runes the upload request, the file contents should be a base 64 encoded string
     *
     * @param entity
     * @param fileContents
     */
    async uploadAsset(entity: IsEntity, fileContents: string): Promise<Asset> {
        return this.requestHandler.post(entity.baseRoute() + '/' + entity.id + '/assets', true, false, {
            file_contents: fileContents,
        }).then(response => {
            return Promise.resolve(new Asset(response));
        });
    }
}
