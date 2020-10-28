import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {ComponentsModule} from '../../components/components.module';
import {SubscriptionPage} from './subscription.page';
import {StripeModule} from 'stripe-angular';

const routes: Routes = [
    {
        path: '',
        component: SubscriptionPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        StripeModule,
    ],
    declarations: [SubscriptionPage]
})
export class SubscriptionPageModule {}
