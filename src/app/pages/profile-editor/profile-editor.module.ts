import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {ComponentsModule} from '../../components/components.module';
import {ProfileEditorPage} from './profile-editor.page';

const routes: Routes = [
    {
        path: '',
        component: ProfileEditorPage
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
    declarations: [ProfileEditorPage]
})
export class ProfileEditorPageModule {
}
