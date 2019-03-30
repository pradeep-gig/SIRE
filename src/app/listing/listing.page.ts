import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import {interval} from "rxjs";
import { IonInfiniteScroll } from '@ionic/angular';
// import { MenuController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  logoPath: string;
  PostingsResp: Array<any>;
  Postings: Array<any>;
  showNext: boolean = false;
  segmentType: string;
  searchInput: string = "";
  offsetVal = 0;
  showText = "Loading posts...";
  text = 'Check out the Ionic Academy!';
  url = 'https://ionicacademy.com';

  constructor( private apiService: ApiService, private router: Router, private socialSharing: SocialSharing) {
    this.segmentType = "availablity";
    this.Postings =[];
   }
   ionViewDidEnter(){
    this.segmentType = "availablity";
    this.Postings =[];
    this.fetchPosting(this.offsetVal, this.searchInput, "availablity");
   }
   public async ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.PostingsResp = [];
    this.apiService.showLoading();
    this.fetchPosting(this.offsetVal, this.searchInput, "availablity");
  }

  async shareWhatsApp() {
    // Text + Image or URL works
    this.socialSharing.shareViaWhatsApp(this.text, null, this.url).then(() => {
      // Success
    }).catch((e) => {
      // Error!
    });
  }

  search(e){
    this.offsetVal = 0;
    this.apiService.showLoading();
    this.fetchPosting(this.offsetVal, this.searchInput, this.segmentType);
  }

  onCancel(e){
    const subscription = setTimeout(() => {
      this.offsetVal = 0;
      this.apiService.showLoading();
      this.fetchPosting(this.offsetVal, this.searchInput, this.segmentType);
    }, 500);
  }

  doInfinite(infiniteScroll){
    this.offsetVal =+ 1;
    this.apiService.getpost(this.offsetVal, this.searchInput, this.segmentType).subscribe(res => {
      infiniteScroll.target.complete();
      if(res['status'] == 'Success'){
        if(res['data'].length > 0){
          let obj = Object.assign([],res['data']);
          for(let row in obj){
            this.PostingsResp.push(obj[row]);
          }
        }
      }
    },error => {
      infiniteScroll.target.complete();
      this.apiService.checkConnectivity();
    });
  }

  fetchPosting(offset, search, type){
    this.PostingsResp = [];
    this.showText = 'Loading posts...';
    this.apiService.getpost(offset, search, type).subscribe(res => {
      this.apiService.hideLoading();
      if(res['status'] == 'Success'){
        if(res['data'].length > 0){
          this.PostingsResp = Object.assign([],res['data']);
          // this.populateListings();
        }else{
          this.showText = 'No posts to show';;
        }
      }
    },error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  viewDetails(data) {
    this.router.navigate(['/post-view/' + data.id]);
  }

  populateListings(){
    this.Postings = [];
    this.Postings = this.PostingsResp.filter((postingData) => (postingData.typeofpost === this.segmentType));
  }

  onSegmentChanged(value: string) {
    this.searchInput = '';
    this.offsetVal = 0;
    this.segmentType = value;
    this.apiService.showLoading();
    this.fetchPosting(this.offsetVal, this.searchInput, value);
  }

  // openMenu() {
  //   this.menu.enable(true, 'sideBarMenu');
  //   this.menu.open('sideBarMenu');
  // }


}
