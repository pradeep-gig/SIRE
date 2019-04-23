import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { PostViewPage } from './post-view/post-view.page';
import { LandingPage } from './landing/landing';
import { ApiService } from './services/api/api.service';
import { FcmService } from './services/fcm/fcm.service';
import { tap } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController, private router: Router,
    private deeplinks: Deeplinks,
    private apiService: ApiService,
    public fcmService: FcmService,
    private fcm: FCM ) {
    this.initializeApp();
    
  }
  
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  close(){
    this.menu.close()
  }

  logout() {
    localStorage.removeItem("userdata");
    localStorage.removeItem("token");
    this.close();
    this.router.navigate(['/login']);
  }

  initializeApp() {

    // this.fcmService.listenToNotifications().subscribe(data => {
    //   alert(data);
    //   if (data.wasTapped) {
    //     alert('Received in background');
    //     this.router.navigate(['/listing']);
    //   } else {
    //     alert('Received in foreground');
    //     this.router.navigate(['/listing']);
    //   }
    // });

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deeplinks.route({
        '/post': {'link': 'post-view'}
      }).subscribe(match => {
        if(match.$link.path == '/post'){
          let postId = match.$args['id'];
          if(!!postId){
            this.router.navigate(['/post-view/' + postId]);
          }else {
            this.router.navigate(['/landing']);
          }
        }
      }, nomatch => {
        // alert(JSON.stringify(nomatch));
      });
    });

  }
  
}
