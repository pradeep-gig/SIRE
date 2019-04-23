import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {interval} from "rxjs";
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  logoPath: string;
  NotificationResp: Array<any>;
  userInfo;
  showText: string;
  showList: boolean;
  offset = 0;
  constructor(private apiService: ApiService, public router: Router) { }
  
  ionViewDidEnter(){
    this.userInfo = this.apiService.getSessionData();
    this.showList = false;
    this.NotificationResp = [];
    this.getNotification(this.offset);
  }
  
  ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.NotificationResp = [];
  }


  viewPost(item){
    var data = {'post_id': item.id, 'user_id': this.userInfo.ID};
    var that = this;
    this.apiService.ReadNotification(data).subscribe(function(response){
      var cnt = localStorage.getItem('count');
      if(!!cnt){
        var numCnt = parseInt(cnt);
        if(numCnt-1 != 0){
          localStorage.setItem('count', (numCnt-1).toString());
        }else {
          localStorage.removeItem('count');
        }
      }
      that.router.navigate(['/post-view/' + item.id]);
    });
    
    
  }

  getNotification(start){
    this.showText = 'Loading Notification';
    this.apiService.showLoading();
    var that = this;
    this.apiService.fetchNotification(this.userInfo.ID, start).subscribe(function(response){
      that.apiService.hideLoading();
      if(!!response && !!response['data'] && response['data'].length > 0){
        that.showText = '';
        that.showList = true;
          let obj = Object.assign([],response['data']);
          for(let row in obj){
            that.NotificationResp.push(obj[row]);
          }
      }
    });
  }

  doInfinite(infiniteScroll){
    this.offset =  this.offset + 1;
    this.apiService.fetchNotification(this.userInfo.ID, this.offset).subscribe(res => {
      infiniteScroll.target.complete();
      if(res['status'] == 'Success'){
        if(res['data'].length > 0){
          let obj = Object.assign([],res['data']);
          for(let row in obj){
            this.NotificationResp.push(obj[row]);
          }
        }
      }
    },error => {
      infiniteScroll.target.complete();
      this.apiService.checkConnectivity();
    });
  }

}
