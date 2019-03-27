import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListingPage } from './listing.page';
import { Search } from '../pipes/search';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
const routes: Routes = [
  {
    path: '',
    component: ListingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [SocialSharing],
  declarations: [ListingPage,Search]
})
export class ListingPageModule {}
