import {MembershipPlan} from '../../../models/subscription/membership-plan';
import {PaymentMethod} from '../../../models/payment/payment-method';
import {Subscription} from '../../../models/subscription/subscription';
import {RequestHandlerService} from '../../request-handler/request-handler.service';
import Entity from '../../../models/entity';

/**
 * All requests needed for handling subscriptions within the app
 */
export default class Subscriptions
{
    /**
     * The membership plans that have been loaded
     */
    private membershipPlans: MembershipPlan[];

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
        if (this.membershipPlans) {
            return Promise.resolve(this.membershipPlans);
        }

        return this.requestHandler
            .get('membership-plans', true, true, [
                'features',
            ])
            .then(response => {
                const data = response && response.data ? response.data : [];
                const membershipPlans = [];
                data.forEach(entry => {
                    membershipPlans.push(new MembershipPlan(entry));
                });
                this.membershipPlans = membershipPlans;
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
    async createSubscription(entity: Entity, paymentMethod: PaymentMethod, membershipPlan: MembershipPlan): Promise<Subscription>
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
    async updateSubscription(entity: Entity, subscription: Subscription, data: any): Promise<Subscription>
    {
        return this.requestHandler
            .put(entity.baseRoute() + '/' + entity.id + '/subscriptions/' + subscription.id, true, true, data)
            .then(response => {
                    return Promise.resolve(new Subscription(response));
                }
            );
    }
}
