import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '',canActivate: [AuthGuard], redirectTo: 'listing', pathMatch: 'full' },
  { path: 'home', canActivate: [AuthGuard],loadChildren: './home/home.module#HomePageModule' },
  { path: 'login',loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register',loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'listing', canActivate: [AuthGuard],loadChildren: './listing/listing.module#ListingPageModule' },
  { path: 'create-post', canActivate: [AuthGuard],loadChildren: './create-post/create-post.module#CreatePostPageModule' },
  { path: 'post-view/:id', canActivate: [AuthGuard],loadChildren: './post-view/post-view.module#PostViewPageModule' },
  { path: 'landing',loadChildren: './landing/landing.module#LandingPageModule' },
  { path: 'edit-post/:id', canActivate: [AuthGuard],loadChildren: './edit-post/edit-post.module#EditPostPageModule' },
  { path: 'terms', canActivate: [AuthGuard],loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'message', canActivate: [AuthGuard],loadChildren: './message/message.module#MessagePageModule' },
  { path: 'dashboard', canActivate: [AuthGuard], loadChildren: './dashboard/dashboard.module#DashboardPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

