import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BasePage} from '../base.page';
import {MembershipPlan} from '../../models/subscription/membership-plan';
import {PaymentMethod} from '../../models/payment/payment-method';
import {Subscription} from '../../models/subscription/subscription';
import {RequestsService} from '../../services/requests/requests.service';
import {UserService} from '../../services/data-services/user.service';
import {ToastrService} from 'ngx-toastr';
import {StripeCard} from 'stripe-angular';
import DateHelpersService from '../../services/date-helpers/date-helpers.service';
import Entity from '../../models/entity';
import {User} from '../../models/user/user';
import {Feature} from '../../models/feature';
import {SubscriptionService} from '../../services/data-services/subscription.service';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage extends BasePage implements OnInit
{
    /**
     * The available membership plans
     */
    membershipPlans: MembershipPlan[];

    /**
     * The form object that helps us validate the sign in form
     */
    entity: Entity;

    /**
     * The current subscription if there is one
     */
    currentSubscription: Subscription = null;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * Any general errors with the process
     */
    error: string = null;

    /**
     * The payment method the user has selected. False if none, null if new.
     */
    selectedPaymentMethod: PaymentMethod|false = false;

    /**
     * The selected membership plan if one has been selected
     */
    selectedMembershipPlan: MembershipPlan = null;

    /**
     * The feature id the user is trying to get access to
     */
    feature: Feature = null;

    /**
     * Default Constructor
     * @param requests
     * @param userService
     * @param router
     * @param route
     * @param toastrService
     * @param subscriptionService
     */
    constructor(private requests: RequestsService,
                private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private toastrService: ToastrService,
                private subscriptionService: SubscriptionService)
    {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit()
    {
        this.loadEntityData();
    }

    /**
     * Loads our user fresh from the server, and then figures out their current subscription status
     */
    private loadEntityData()
    {
        this.requests.auth.loadInitialInformation().then(user => {
            this.userService.storeMe(user);

            const maybeOrganizationId = this.route.snapshot.paramMap.get('organization_id');
            if (maybeOrganizationId) {
                const organizationId = Number.parseInt(maybeOrganizationId);
                if (!user.organization_managers.find(i => i.organization_id == organizationId)) {
                    this.handleUnauthorizedAccess();
                    return;
                }

                this.requests.organization.loadOrganization(organizationId).then(organization => {
                    this.readyEntity(organization);
                })

            } else {
                this.readyEntity(user);
            }
        }).catch(console.error);
    }

    /**
     * Takes us to the home page at the moment, and shows an error message
     */
    private handleUnauthorizedAccess()
    {
        this.toastrService.error('You do not have permission to access this organization.');
        this.router.navigateByUrl('/home').catch(console.error);
    }

    /**
     * Gets everything ready for the entity passed in
     * @param entity
     */
    private readyEntity(entity: Entity)
    {
        this.entity = entity;
        this.currentSubscription = this.entity.getCurrentSubscription();
        if (this.currentSubscription) {
            this.selectedPaymentMethod = this.entity.payment_methods.find(paymentMethod => {
                return paymentMethod.id == this.currentSubscription.payment_method_id;
            });
        }
        if (this.entity.payment_methods.length == 0) {
            this.selectedPaymentMethod = null;
        }
        this.getSubscriptionDataReady();
    }

    /**
     * Gets everything ready after we have the user loaded
     */
    private getSubscriptionDataReady()
    {
        this.requests.subscriptions.fetchMembershipPlans().then(membershipPlans => {

            const maybeFeatureId = this.route.snapshot.paramMap.get('feature_id');

            if (maybeFeatureId) {
                this.findFeature(parseInt(maybeFeatureId), membershipPlans);
            } else {
                this.setAvailableMembershipMembershipPlans(membershipPlans);
            }
        }).catch(console.error);
    }

    /**
     * gets everything ready for when the user wants to access a feature
     */
    findFeature(featureId: number, membershipPlans: MembershipPlan[])
    {
        this.subscriptionService.getFeature(featureId).then(feature => {
            this.feature = feature;
            this.setAvailableMembershipMembershipPlans(
                membershipPlans.filter(membershipPlan => membershipPlan.containsFeatureId(featureId))
            );
        }).catch(() => {
            // TODO handle feature not available error
        });
    }

    /**
     * Sets all membership plans that are currently available based on the current page state
     * @param membershipPlans
     */
    setAvailableMembershipMembershipPlans(membershipPlans: MembershipPlan[])
    {
        this.membershipPlans = this.currentSubscription ? membershipPlans.filter(membershipPlan => {
            return membershipPlan.current_cost > this.currentSubscription.membership_plan_rate.cost;
        }) : membershipPlans;
        if (this.membershipPlans.length == 1) {
            this.setSelectedMembershipPlan(this.membershipPlans[0]);
        }
    }

    /**
     * All active membership plans
     */
    activeMembershipPlans(): MembershipPlan[]
    {
        return this.membershipPlans.filter(membershipPlan => {
            return membershipPlan.visible && (this.currentSubscription ? this.currentSubscription.membership_plan_rate.cost < membershipPlan.current_cost : true);
        });
    }

    /**
     * Gets the display style for the card selector
     */
    getCardSelectorDisplay()
    {
        return {
            display: !this.currentSubscription || !this.changingPaymentMethod() || (this.currentSubscription.expires_at && this.currentSubscription.recurring) ?
                'block' : 'none',
        };
    }

    /**
     * Gets the new card input display
     */
    getCardDisplay()
    {
        return {
            display: this.selectedPaymentMethod === null ? 'flex' : 'none',
        };
    }

    /**
     * Gets the user's current subscription status
     */
    getCurrentSubscriptionStatus(): string
    {
        if (!this.currentSubscription.expires_at) {
            return 'good for a lifetime!';
        } else {
            const now = new Date();
            let formattedExpiration = DateHelpersService.suffixDay(this.currentSubscription.expires_at.getDate());
            if (this.currentSubscription.expires_at.getMonth() != now.getMonth() || this.currentSubscription.expires_at.getFullYear() !== now.getFullYear()) {
                formattedExpiration+= ' of ' + DateHelpersService.getMonthName(this.currentSubscription.expires_at);
            }
            if (this.currentSubscription.expires_at.getFullYear() !== now.getFullYear()) {
                formattedExpiration+= ' ' + this.currentSubscription.expires_at.getFullYear();
            }
            if (this.currentSubscription.recurring) {
                return 'set to be auto-renewed on the ' + formattedExpiration + '.';
            } else {
                return 'set to expire on the ' + formattedExpiration + '.';
            }
        }
    }

    /**
     * This returns true if the user is an existing subscriber who is not upgrading their membership plan
     */
    changingPaymentMethod(): boolean
    {
        return this.currentSubscription && !this.selectedMembershipPlan;
    }

    /**
     * Sets the subscription to be recurring
     * @param recurring
     */
    setRecurring(recurring: boolean)
    {
        this.requests.subscriptions.updateSubscription(
            this.entity,
            this.currentSubscription,
            {recurring: recurring}
        ).then(subscription => {
            this.currentSubscription.recurring = recurring;
        });
    }

    /**
     * Sets the current payment method the user has selected
     * @param paymentMethod
     */
    setSelectedPaymentMethod(paymentMethod: PaymentMethod)
    {
        this.selectedPaymentMethod = paymentMethod;
    }

    /**
     * Sets the selected membership plan properly
     * @param membershipPlan
     */
    setSelectedMembershipPlan(membershipPlan: MembershipPlan)
    {
        this.selectedMembershipPlan = membershipPlan;
    }

    /**
     * Validates the save properly
     */
    submit(stripeCard: StripeCard)
    {
        this.submitted = true;
        this.error = null;

        if (!this.selectedMembershipPlan && !this.currentSubscription) {
            this.error = 'Please select a membership plan.';
        } else if (this.selectedPaymentMethod === false) {
            this.error = 'Please select a payment method.';
        } else if (this.selectedPaymentMethod === null) {
            stripeCard.createToken().then(token => {
                this.requests.entityRequests.createPaymentMethod(this.entity, token.id).then(paymentMethod => {
                    this.entity.payment_methods.push(paymentMethod);
                    this.setSelectedPaymentMethod(paymentMethod);
                    this.completePaymentSubmission(paymentMethod);
                }).catch(error => {
                    this.error = error.message;
                });
            });
        } else {
            this.completePaymentSubmission(this.selectedPaymentMethod as PaymentMethod);
        }
    }

    /**
     * Completes the payment submission process
     * @param paymentMethod
     */
    completePaymentSubmission(paymentMethod: PaymentMethod)
    {
        if (this.selectedMembershipPlan) {
            this.createSubscription(paymentMethod);
        } else {
            this.changePaymentMethod(paymentMethod);
        }
    }

    /**
     * creates a subscription properly
     */
    createSubscription(paymentMethod: PaymentMethod)
    {
        if (paymentMethod) {

            this.requests.subscriptions.createSubscription(
                this.entity,
                paymentMethod as PaymentMethod,
                this.selectedMembershipPlan
            ).then(subscription => {
                this.currentSubscription = subscription;
                this.entity.subscriptions.push(subscription);
                if (this.entity.baseRoute() == 'users') {
                    this.userService.storeMe(this.entity as User);
                }
                this.toastrService.show( 'Subscription successfully created!');
            }).catch(error => {
                console.error(error);
                this.error = 'Error processing payment. Please try another payment source.';
            });
        }
    }

    /**
     * Changes the payment method properly
     * @param paymentMethod
     */
    changePaymentMethod(paymentMethod: PaymentMethod)
    {
        this.requests.subscriptions.updateSubscription(
            this.entity,
            this.currentSubscription,
            {payment_method_id: paymentMethod.id}
        ).then(() => {
            this.currentSubscription.payment_method_id = paymentMethod.id;
        });
    }
}
