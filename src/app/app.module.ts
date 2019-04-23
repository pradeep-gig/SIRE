import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { FcmService } from './services/fcm/fcm.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

const firebaseConfig = {
  apiKey: "AIzaSyAd20TXypSh6jkQip_TT8opsfRYqKNe2wc",
  authDomain: "sire-bb008.firebaseapp.com",
  databaseURL: "https://sire-bb008.firebaseio.com",
  projectId: "sire-bb008",
  storageBucket: "sire-bb008.appspot.com",
  messagingSenderId: "546992727737"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, AngularFireModule, AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    Deeplinks,
    FcmService,
    Firebase,
    AngularFirestore,
    FCM,
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
