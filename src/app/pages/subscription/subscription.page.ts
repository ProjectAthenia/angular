import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user/user';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../base.page';
import {MembershipPlan} from '../../models/subscription/membership-plan';
import {PaymentMethod} from '../../models/payment/payment-method';
import {Subscription} from '../../models/subscription/subscription';
import {RequestsService} from '../../services/requests/requests.service';
import {UserService} from '../../services/data-services/user.service';
import {ToastrService} from 'ngx-toastr';
import {StripeCard} from 'stripe-angular';
import DateHelpersService from '../../services/date-helpers/date-helpers.service';

declare function require(name:string);
require('card');

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.page.html',
    styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage extends BasePage implements OnInit {

    /**
     * The available membership plans
     */
    membershipPlans: MembershipPlan[];

    /**
     * The form object that helps us validate the sign in form
     */
    user: User;

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
    selectedPaymentMethod: PaymentMethod|boolean = false;

    /**
     * The selected membership plan if one has been selected
     */
    selectedMembershipPlan: MembershipPlan = null;

    /**
     * Default Constructor
     * @param requests
     * @param userService
     * @param route
     * @param toastrService
     */
    constructor(private requests: RequestsService,
                private userService: UserService,
                private route: ActivatedRoute,
                private toastrService: ToastrService,
    ) {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit() {
        this.requests.subscriptions.fetchMembershipPlans().then(membershipPlans => {
            this.membershipPlans = membershipPlans;
            if (this.membershipPlans.length == 1) {
                this.setSelectedMembershipPlan(this.membershipPlans[0]);
            }
            this.requests.auth.loadInitialInformation().then(user => {
                this.user = user;
                this.userService.storeMe(user);
                this.currentSubscription = this.user.getCurrentSubscription();
                if (this.currentSubscription) {
                    this.selectedPaymentMethod = this.user.payment_methods.find(paymentMethod => {
                        return paymentMethod.id == this.currentSubscription.payment_method_id;
                    });
                }
                if (this.user.payment_methods.length == 0) {
                    this.selectedPaymentMethod = null;
                }
            }).catch(console.error);
        }).catch(console.error);
    }

    /**
     * All active membership plans
     */
    activeMembershipPlans(): MembershipPlan[] {
        return this.membershipPlans;
    }

    /**
     * Gets the display style for the card selector
     */
    getCardSelectorDisplay() {
        return {
            display: !this.currentSubscription ||
            (this.currentSubscription.expires_at && this.currentSubscription.recurring) ? 'block' : 'none',
        };
    }

    /**
     * Gets the new card input display
     */
    getCardDisplay() {
        return {
            display: this.selectedPaymentMethod === null ? 'flex' : 'none',
        };
    }

    /**
     * Gets the user's current subscription status
     */
    getCurrentSubscriptionStatus(): string {
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
     * Sets the subscription to be recurring
     * @param recurring
     */
    setRecurring(recurring: boolean) {
        this.requests.subscriptions.updateSubscription(
            this.user,
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
    setSelectedPaymentMethod(paymentMethod: PaymentMethod) {
        this.selectedPaymentMethod = paymentMethod;
    }

    /**
     * Sets the selected membership plan properly
     * @param membershipPlan
     */
    setSelectedMembershipPlan(membershipPlan: MembershipPlan) {
        this.selectedMembershipPlan = membershipPlan;
    }

    /**
     * Validates the save properly
     */
    submit(stripeCard: StripeCard) {

        this.submitted = true;
        this.error = null;

        if (this.currentSubscription) {
            if (this.selectedPaymentMethod === null) {
                stripeCard.createToken().then(token => {
                    this.requests.entityRequests.createPaymentMethod(this.user, token.id).then(paymentMethod => {
                        this.user.payment_methods.push(paymentMethod);
                        this.setSelectedPaymentMethod(paymentMethod);
                        this.changePaymentMethod(paymentMethod);
                    });
                }).catch(error => {
                    this.error = error.message;
                });
            } else {
                this.changePaymentMethod(this.selectedPaymentMethod as PaymentMethod);
            }
        } else {
            if (!this.selectedMembershipPlan) {
                this.error = 'Please select a membership plan.';
            } else if (this.selectedPaymentMethod === false) {
                this.error = 'Please select a payment method.';
            } else if (this.selectedPaymentMethod === null) {
                stripeCard.createToken().then(token => {
                    this.requests.entityRequests.createPaymentMethod(this.user, token.id).then(paymentMethod => {
                        this.selectedPaymentMethod = paymentMethod;
                        this.user.payment_methods.push(paymentMethod);
                        this.createSubscription();
                    }).catch(error => {
                        this.error = error.message;
                    });
                });
            } else {
                this.createSubscription();
            }
        }
    }

    /**
     * creates a subscription properly
     */
    createSubscription() {
        const paymentMethod = this.selectedPaymentMethod;
        if (paymentMethod) {

            this.requests.subscriptions.createSubscription(
                this.user, paymentMethod as PaymentMethod,
                this.selectedMembershipPlan
            ).then(subscription => {
                this.currentSubscription = subscription;
                this.user.subscriptions.push(subscription);
                this.userService.storeMe(this.user);
                this.toastrService.show( 'Subscription successfully created!');
            }).catch(() => {
                this.error = 'Error processing payment. Please try another payment source.';
            });
        }
    }

    /**
     * Changes the payment method properly
     * @param paymentMethod
     */
    changePaymentMethod(paymentMethod: PaymentMethod) {
        this.requests.subscriptions.updateSubscription(
            this.user,
            this.currentSubscription,
            {payment_method_id: paymentMethod.id}
        ).then(() => {
            this.currentSubscription.payment_method_id = paymentMethod.id;
        });
    }
}
