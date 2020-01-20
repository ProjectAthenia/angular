import {RequestHandlerService} from '../request-handler/request-handler.service';
import Auth from './auth/auth';
import {Injectable} from '@angular/core';
import Subscriptions from './subscriptions/subscriptions';
import Social from './social/social';
import Messaging from './messaging/messaging';

/**
 * Provider for interacting with all app wide requests
 */
@Injectable({
  providedIn: 'root'
})
export class RequestsServices {

    /**
     * The auth requests available
     */
    auth: Auth;

    /**
     * The requests related to our subscriptions
     */
    subscriptions: Subscriptions;

    /**
     * The social media requests available
     */
    social: Social;

    /**
     * The messaging requests available
     */
    messaging: Messaging;

    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerService) {
        this.auth = new Auth(requestHandler);
        this.subscriptions = new Subscriptions(this.requestHandler);
        this.social = new Social(this.requestHandler);
        this.messaging = new Messaging(requestHandler);
    }
}
