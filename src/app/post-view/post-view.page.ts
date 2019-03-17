import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
})
export class PostViewPage implements OnInit {
  logoPath: string;
  postingInfo = {};
  displayInfo = [];

  showData = false;
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { 
 
  }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';

    this.apiService.showLoading();
    this.apiService.fetchPost(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.apiService.hideLoading();
      if(!!res['status'] && res['status'] == 'Success'){
        this.postingInfo = res['data'];
        this.showData = true;
        for(let post in this.postingInfo){
          if(post != 'id' && post != 'user' && this.postingInfo[post] != ''){
            let obj = {'name': post, 'value': this.postingInfo[post]};
            this.displayInfo.push(obj);
          }
        }
      }else{
        this.showData = false;
        this.apiService.showToast("Not able to fetch details", false, '', 'bottom', 2000);
      }
    }, err => {
      this.showData = false;
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });



  }

}