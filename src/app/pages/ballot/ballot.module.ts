import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {BallotPage} from './ballot.page';
import {ComponentsModule} from '../../components/components.module';


const routes: Routes = [
  {
    path: '',
    component: BallotPage,
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
  declarations: [BallotPage]
})
export class OrganizationUsersManagementPageModule {}
