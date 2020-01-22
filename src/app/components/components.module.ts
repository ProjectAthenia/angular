import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponentComponent} from './loading-component/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LoadingComponentComponent,
  ],
  exports: [
    LoadingComponentComponent,
  ],
})
export class ComponentsModule {}
