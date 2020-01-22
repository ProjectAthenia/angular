import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponentComponent} from './loading-component/loading.component';
import {RatingBarComponent} from './rating-bar/rating-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    LoadingComponentComponent,
    RatingBarComponent,
  ],
  exports: [
    LoadingComponentComponent,
    RatingBarComponent,
  ],
})
export class ComponentsModule {}
