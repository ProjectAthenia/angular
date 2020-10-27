import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {ComponentsModule} from '../../components/components.module';
import {OrganizationCreationPage} from './organization-creation.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationCreationPage,
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
  declarations: [OrganizationCreationPage]
})
export class OrganizationCreationPageModule {}
