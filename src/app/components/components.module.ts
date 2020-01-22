import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponentComponent} from './loading-component/loading.component';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ArticleViewerComponent,
    LoadingComponentComponent,
    RatingBarComponent,
  ],
  exports: [
    ArticleViewerComponent,
    LoadingComponentComponent,
    RatingBarComponent,
  ],
})
export class ComponentsModule {}
