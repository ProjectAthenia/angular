import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {SignInPage} from './sign-in.page';
import {ComponentsModule} from '../../components/components.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
        path: '',
        component: SignInPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        ReactiveFormsModule,
        NgbModule,
    ],
    declarations: [SignInPage]
})
export class SignInPageModule {
}
