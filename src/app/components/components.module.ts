import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponentComponent} from './loading-component/loading.component';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    ArticleEditorComponent,
    ArticleViewerComponent,
    LoadingComponentComponent,
    RatingBarComponent,
  ],
  exports: [
    ArticleEditorComponent,
    ArticleViewerComponent,
    LoadingComponentComponent,
    RatingBarComponent,
  ],
})
export class ComponentsModule {}
