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
  searchInput = {'typeofpost': '', 'location': '', 'type': ''};
  offsetVal = 0;
  showText = "Loading posts...";
  text = 'Check this out! ';
  url = 'https://ionicacademy.com';
  count: any;
  showCount = false;

  constructor( private apiService: ApiService, private router: Router, private socialSharing: SocialSharing) {
    this.segmentType = "availablity";
    this.Postings =[];
   }
   
   ionViewDidEnter(){

    var cnt = localStorage.getItem('count');
    if(!!cnt){
      this.count = cnt;
      this.showCount = true;
    }
   
    this.Postings =[];
    
    var postInfo = localStorage.getItem('postInfo');
    if(postInfo){
      this.share('other', JSON.parse(postInfo));
      localStorage.removeItem('postInfo');
    }
    var searchInfo = localStorage.getItem('search');
    if(searchInfo){
      this.offsetVal = 0;
      this.searchInput = JSON.parse(searchInfo);
      this.segmentType = this.searchInput.typeofpost;
      this.apiService.showLoading();
      this.fetchPosting(this.offsetVal, this.searchInput);
      localStorage.removeItem('search');
    }else {
      this.searchInput.typeofpost = 'availablity';
      this.segmentType = "availablity";
      this.fetchPosting(this.offsetVal, this.searchInput);
    }
   }
   public async ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.PostingsResp = [];
   // this.apiService.showLoading();
   //  this.fetchPosting(this.offsetVal, this.searchInput, "availablity");
  }

  async share(type, item) {
      // Text + Image or URL works
      let urlLink = "sireapp://sireapp.com/post?id="+item.id;
      urlLink = this.apiService.restBaseUrl +"app_redirect&url="+btoa(urlLink);
      

      if(type == 'whatsapp'){
        let msg = 'Check this out! '+ "\r\n\r\n" +'*Title* :' + item.title + "\r\n\r\n" + '*Property Type* :' + item.type + "\r\n\r\n" + '*Property Location* :' + item.location + "\r\n\r\n" + '*Budget* :' + item.budget + "\r\n\r\n" + '*Terms* :' + item.terms + "\r\n\r\n" + '*Area* :' + item.area + "\r\n\r\n"+ '*Dimension* :' + item.dimension + "\r\n\r\n"+ '*Facing* :' + item.facing + "\r\n\r\n"+ '*Contact number* :' + item.contact + "\r\n\r\n";
        encodeURIComponent(msg);
        this.socialSharing.shareViaWhatsApp(msg, null, urlLink).then(() => {
          
        }).catch((e) => {
          
        });
      }else if(type == 'fb'){
        let msg = 'Hi,';
        let u = 'https://ionicframework.com/';
        //let msg = 'Check this out! '+ "<br><br>" +' <strong>Title</strong> :' + item.title + "<br><br>" + '<strong>Type</strong> :' + item.type + "<br><br>" + '<strong>Location</strong> :' + item.location + "<br><br>" + '<strong>budget</strong> :' + item.budget + "<br><br>" + urlLink;
        // encodeURIComponent(msg);
        this.socialSharing.shareViaFacebook(msg, null, u).then(() => {
          
        }).catch((e) => {
          
        });
      }else if(type == 'tw'){
        // let msg = 'Check this out! '+ "<br><br>" +' *Title</strong> :' + item.title + "<br><br>" + '<strong>Type</strong> :' + item.type + "<br><br>" + '<strong>Location</strong> :' + item.location + "<br><br>" + '<strong>budget</strong> :' + item.budget + "<br><br>"+ urlLink ;
        // encodeURIComponent(msg);
        let msg = 'Hi,';
        let u = 'https://ionicframework.com/';
        this.socialSharing.shareViaTwitter(msg, null, u).then(() => {
          
        }).catch((e) => {
          
        });
      }else if(type == 'other'){
        let msg = 'Check this out! '+ "\r\n\r\n" +'*Title* :' + item.title + "\r\n\r\n" + '*Property Type* :' + item.type + "\r\n\r\n" + '*Property Location* :' + item.location + "\r\n\r\n" + '*Budget* :' + item.budget + "\r\n\r\n" + '*Terms* :' + item.terms + "\r\n\r\n" + '*Area* :' + item.area + "\r\n\r\n"+ '*Dimension* :' + item.dimension + "\r\n\r\n"+ '*Facing* :' + item.facing + "\r\n\r\n"+ '*Contact number* :' + item.contact + "\r\n\r\n";
        encodeURIComponent(msg);
       console.log(msg);
       console.log(urlLink);
        // this.socialSharing.share(msg, 'SI RE', null, urlLink).then(() => {
        //   // 
        // }).catch((e) => {
          
        // });
      }
    }


  doInfinite(infiniteScroll){
    this.offsetVal = this.offsetVal+ 1;
    this.apiService.getpost(this.offsetVal, this.searchInput).subscribe(res => {
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

  fetchPosting(offset, search){
    this.PostingsResp = [];
    this.showText = 'Loading posts...';
    this.apiService.getpost(offset, search).subscribe(res => {
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
    this.offsetVal = 0;
    this.segmentType = value;
    this.apiService.showLoading();
    this.searchInput.typeofpost = value;
    this.fetchPosting(this.offsetVal, this.searchInput);
  }

  // openMenu() {
  //   this.menu.enable(true, 'sideBarMenu');
  //   this.menu.open('sideBarMenu');
  // }


}
