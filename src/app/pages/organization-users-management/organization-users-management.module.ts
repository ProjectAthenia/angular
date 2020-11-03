import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {OrganizationUsersManagementPage} from './organization-users-management.page';
import {ComponentsModule} from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: OrganizationUsersManagementPage,
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
  declarations: [OrganizationUsersManagementPage]
})
export class OrganizationUsersManagementPageModule {}
