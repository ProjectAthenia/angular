import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'ballot/:ballot_id',
        loadChildren: () => import('./pages/ballot/ballot.module').then(m => m.BallotPageModule),
    },
    {
        path: 'contacts',
        loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule),
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'organization-creation',
        loadChildren: () => import('./pages/organization-creation/organization-creation.module').then(m => m.OrganizationCreationPageModule)
    },
    {
        path: 'organization-users-management/:organization_id',
        loadChildren: () => import('./pages/organization-users-management/organization-users-management.module').then(m => m.OrganizationUsersManagementPageModule)
    },
    {
        path: 'profile-editor',
        loadChildren: () => import('./pages/profile-editor/profile-editor.module').then(m => m.ProfileEditorPageModule)
    },
    {
        path: 'sign-in',
        loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInPageModule)
    },
    {
        path: 'sign-up',
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpPageModule)
    },
    {
        path: 'subscription',
        loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionPageModule)
    },
    {
        path: 'subscription/:feature_id',
        loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionPageModule)
    },
    {
        path: 'organization-subscription/:organization_id',
        loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionPageModule)
    },
    {
        path: 'threads',
        loadChildren: () => import('./pages/threads/threads.module').then(m => m.ThreadsPageModule),
    },
    {
        path: 'user/:user_id',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserPageModule),
    },
    {
        path: 'user/:user_id/message',
        loadChildren: () => import('./pages/thread/thread.module').then(m => m.ThreadPageModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
