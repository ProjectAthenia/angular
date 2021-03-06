import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {ComponentsModule} from '../../components/components.module';
import {ThreadsPage} from './threads.page';

const routes: Routes = [
    {
        path: '',
        component: ThreadsPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ComponentsModule,
        ReactiveFormsModule,
    ],
    declarations: [ThreadsPage]
})
export class ThreadsPageModule {
}
