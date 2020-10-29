import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoadingComponentComponent} from './loading-component/loading.component';
import {RatingBarComponent} from './rating-bar/rating-bar.component';
import {ArticleViewerComponent} from './article-viewer/article-viewer.component';
import {ArticleEditorComponent} from './article-editor/article-editor.component';
import {Ng2LoadingSpinnerModule} from 'ng2-loading-spinner';
import {LoggedInHeaderComponent} from './logged-in-header/logged-in-header.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';
import {LoggedInTemplateComponent} from './logged-in-template/logged-in-template.component';
import {SideBarComponent} from './side-bar/side-bar.component';
import {MenuComponent} from './menu/menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        Ng2LoadingSpinnerModule,
        NgbDropdownModule,
    ],
    declarations: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoadingComponentComponent,
        LoggedInHeaderComponent,
        LoggedInTemplateComponent,
        MenuComponent,
        RatingBarComponent,
        SideBarComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        LoadingComponentComponent,
        LoggedInHeaderComponent,
        LoggedInTemplateComponent,
        MenuComponent,
        RatingBarComponent,
        SideBarComponent,
    ],
})
export class ComponentsModule {
}
