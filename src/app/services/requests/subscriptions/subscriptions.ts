import {RequestHandlerService} from '../../request-handler/request-handler.service';
import {MembershipPlan} from '../../../models/subscription/membership-plan';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Subscription} from '../../../models/subscription/subscription';
import IsEntity from '../../../../../../mobile/src/app/models/contracts/is-entity';

/**
 * All requests needed for handling subscriptions within the app
 */
export default class Subscriptions
{
    /**
     * Default constructor
     * @param requestHandler
     */
    constructor(private requestHandler: RequestHandlerService)
    {}

    /**
     * Fetches all membership plans
     */
    async fetchMembershipPlans(): Promise<MembershipPlan[]>
    {
        return this.requestHandler
            .get('membership-plans', true, true, [])
            .then(response => {
                    const data = response ? response.data : [];
                    const membershipPlans = [];
                    data.forEach(entry => {
                        membershipPlans.push(new MembershipPlan(entry));
                    });
                    return Promise.resolve(membershipPlans);
                }
            );
    }

    /**
     * Creates a subscription properly
     * @param entity
     * @param paymentMethod
     * @param membershipPlan
     */
    async createSubscription(entity: IsEntity, paymentMethod: PaymentMethod, membershipPlan: MembershipPlan): Promise<Subscription>
    {
        const data = {
            recurring: true,
            membership_plan_rate_id: membershipPlan.current_rate_id,
            payment_method_id: paymentMethod.id,
        };
        return this.requestHandler
            .post(entity.baseRoute() + '/' + entity.id + '/subscriptions', true, true, data)
            .then(response => {
                    return Promise.resolve(new Subscription(response));
                }
            );
    }

    /**
     * Creates a subscription properly
     * @param entity
     * @param subscription
     * @param data
     */
    async updateSubscription(entity: IsEntity, subscription: Subscription, data: any): Promise<Subscription>
    {
        return this.requestHandler
            .put(entity.baseRoute() + '/' + entity.id + '/subscriptions/' + subscription.id, true, true, data)
            .then(response => {
                    return Promise.resolve(new Subscription(response));
                }
            );
    }
}
