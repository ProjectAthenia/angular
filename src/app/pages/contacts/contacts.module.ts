import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import {ComponentsModule} from '../../components/components.module';
import {ContactsPage} from './contacts.page';

const routes: Routes = [
  {
    path: '',
    component: ContactsPage
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
  declarations: [ContactsPage]
})
export class ContactsPageModule {}
