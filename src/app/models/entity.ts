import {BaseModel, RelationMap} from './base-model';
import {Relation} from './relation';
import {PaymentMethod} from './payment/payment-method';
import {Subscription} from './subscription/subscription';

/**
 * An interface to apply to a model that makes it easier to pass around as an entity
 */
export default abstract class Entity extends BaseModel
{
    /**
     * All payment methods on this user
     */
    payment_methods: PaymentMethod[];

    /**
     * All payment methods on this user
     */
    subscriptions: Subscription[];

    /**
     * The url to this users profile image
     */
    profile_image_url: string;

    /**
     * Default Constructor
     * @param rawData
     * @param relations
     * @param dates
     */
    protected constructor(protected rawData: Object, protected relations: RelationMap = {}, protected dates: Array<string> = [])
    {
        super(rawData, {
            ...relations,
            payment_methods: new Relation('array', PaymentMethod),
            subscriptions: new Relation('array', Subscription),
        }, dates);
    }

    /**
     * Gets all currently active subscriptions for a user
     */
    getActiveSubscriptions(): Subscription[]
    {
        return this.subscriptions.filter(subscription => {
            return subscription.expires_at == null || subscription.expires_at > new Date();
        });
    }

    /**
     * Gets the users current subscription if there is one
     */
    getCurrentSubscription(): Subscription
    {
        const activeSubscriptions = this.getActiveSubscriptions();
        const sortedSubscriptions = activeSubscriptions.sort((subscriptionA, subscriptionB) => {
            if (!subscriptionA.expires_at) {
                return -1;
            }
            if (!subscriptionB.expires_at) {
                return 1;
            }
            return subscriptionA.expires_at.getTime() - subscriptionB.expires_at.getTime();
        });

        return sortedSubscriptions.length ? sortedSubscriptions[0] : null;
    }

    /**
     * The route for the entity
     */
    abstract baseRoute(): string;
}
