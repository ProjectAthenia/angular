import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule'
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
    path: 'threads',
    loadChildren: './pages/threads/threads.module#ThreadsPageModule',
  },
  {
    path: 'user/:user_id',
    loadChildren: './pages/user/user.module#UserPageModule',
  },
  {
    path: 'contacts',
    loadChildren: './pages/contacts/contacts.module#ContactsPageModule',
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
export class AppRoutingModule { }
