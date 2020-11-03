import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'contacts',
        loadChildren: './pages/contacts/contacts.module#ContactsPageModule',
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomePageModule'
    },
    {
        path: 'organization-creation',
        loadChildren: './pages/organization-creation/organization-creation.module#OrganizationCreationPageModule'
    },
    {
        path: 'organization-users-management/:organization_id',
        loadChildren: './pages/organization-users-management/organization-users-management.module#OrganizationUsersManagementPageModule'
    },
    {
        path: 'profile-editor',
        loadChildren: './pages/profile-editor/profile-editor.module#ProfileEditorPageModule'
    },
    {
        path: 'sign-in',
        loadChildren: './pages/sign-in/sign-in.module#SignInPageModule'
    },
    {
        path: 'sign-up',
        loadChildren: './pages/sign-up/sign-up.module#SignUpPageModule'
    },
    {
        path: 'subscription',
        loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule'
    },
    {
        path: 'subscription/:organization_id',
        loadChildren: './pages/subscription/subscription.module#SubscriptionPageModule'
    },
    {
        path: 'threads',
        loadChildren: './pages/threads/threads.module#ThreadsPageModule',
    },
    {
        path: 'user/:user_id',
        loadChildren: './pages/user/user.module#UserPageModule',
    },
    {
        path: 'user/:user_id/message',
        loadChildren: './pages/thread/thread.module#ThreadPageModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
