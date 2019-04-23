import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FcmService } from '../services/fcm/fcm.service';
import { ApiService } from '../services/api/api.service';
import { tap } from 'rxjs/operators';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public router: Router, public fcmService: FcmService,
    private fcm: FCM, public apiService: ApiService ) { }
  logoPath: string;
  searchInput: string;
  showSearch : boolean = false;
  count: any;
  showCount = false;
  userInfo;
  ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
  }

  enableSearch(){
    this.showSearch = true;
  }

  ionViewDidEnter(){
    this.userInfo = this.apiService.getSessionData();
    var that = this;
    this.apiService.fetchNotification(this.userInfo.ID ,0).subscribe(function(res){
      if(!!res && !!res['cnt']){
        that.count = res['cnt'];
        localStorage.setItem('count', res['cnt']);
        that.showCount = true;
      }
      
    });
    this.count = localStorage.getItem('count');
    this.fcm.onNotification().subscribe(data=>{
      if(data.wasTapped){
        if(data.url){
          this.router.navigate([data.url]);
        }
      }
      else {
        if(data.msg){
          var cnt = localStorage.getItem('count');
          if(!!cnt){
            this.count = parseInt(cnt)+1;
            localStorage.setItem('count', this.count);
          }else{
            this.count = 1;
            localStorage.setItem('count', this.count);
          }
          this.apiService.showToast(data.msg, true, "close", "bottom", 5000);
        }
      }

    } );

  }

  // changeType(){

  // }

  search(e){
    localStorage.setItem('search', this.searchInput);
    this.router.navigate(['/listing']);
  }

  onCancel(e){
    const subscription = setTimeout(() => {
      console.log(this.searchInput);
    }, 500);
  }

}
