import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
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
import {OrganizationUsersManagementComponent} from './organization-users-management/organization-users-management.component';
import {BallotComponent} from './ballot/ballot.component';
import {BallotItemComponent} from './ballot-item/ballot-item.component';
import {SubscriptionUpgradeRequiredWindowComponent} from './subscription-upgrade-required-window/subscription-upgrade-required-window.component';
import {OverlayWindowComponent} from './overlay-window/overlay-window.component';

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
        BallotComponent,
        BallotItemComponent,
        LoadingComponentComponent,
        LoggedInHeaderComponent,
        LoggedInTemplateComponent,
        MenuComponent,
        OrganizationUsersManagementComponent,
        OverlayWindowComponent,
        RatingBarComponent,
        SideBarComponent,
        SubscriptionUpgradeRequiredWindowComponent,
    ],
    exports: [
        ArticleEditorComponent,
        ArticleViewerComponent,
        BallotComponent,
        BallotItemComponent,
        LoadingComponentComponent,
        LoggedInHeaderComponent,
        LoggedInTemplateComponent,
        MenuComponent,
        OrganizationUsersManagementComponent,
        OverlayWindowComponent,
        RatingBarComponent,
        SideBarComponent,
        SubscriptionUpgradeRequiredWindowComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {
}
