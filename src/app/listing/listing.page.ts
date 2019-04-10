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
  text = 'Check this out! ';
  url = 'https://ionicacademy.com';

  constructor( private apiService: ApiService, private router: Router, private socialSharing: SocialSharing) {
    this.segmentType = "availablity";
    this.Postings =[];
   }
   ionViewDidEnter(){
    this.segmentType = "availablity";
    this.Postings =[];
    
    var postInfo = localStorage.getItem('postInfo');
    if(postInfo){
      this.share('other', JSON.parse(postInfo));
      localStorage.removeItem('postInfo');
    }
    var searchInfo = localStorage.getItem('search');
    if(searchInfo){
      this.offsetVal = 0;
      this.searchInput = searchInfo;
      this.apiService.showLoading();
      this.fetchPosting(this.offsetVal, this.searchInput, this.segmentType);
      localStorage.removeItem('search');
    }else {
      this.fetchPosting(this.offsetVal, this.searchInput, "availablity");
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
    urlLink = "https://sire-vinogautam.c9users.io/wp-admin/admin-ajax.php?action=app_redirect&url="+btoa(urlLink);
    

    if(type == 'whatsapp'){
      let msg = 'Check this out! '+ "\r\n\r\n" +'*Title* :' + item.title + "\r\n\r\n" + '*Property Type* :' + item.type + "\r\n\r\n" + '*Property Location* :' + item.location + "\r\n\r\n" + '*Budget* :' + item.budget + "\r\n\r\n" + '*Terms* :' + item.terms + "\r\n\r\n" + '*Area* :' + item.area + "\r\n\r\n"+ '*Dimension* :' + item.dimension + "\r\n\r\n"+ '*Facing* :' + item.facing + "\r\n\r\n"+ '*Contact number* :' + item.contact + "\r\n\r\n";
      encodeURIComponent(msg);
      this.socialSharing.shareViaWhatsApp(msg, null, urlLink).then(() => {
        this.apiService.showToast("Shared successfully", false, '', 'bottom', 2000); 
      }).catch((e) => {
        this.apiService.showToast("failed to share : " + e, false, '', 'bottom', 2000);
      });
    }else if(type == 'fb'){
      let msg = 'Hi,';
      let u = 'https://ionicframework.com/';
      //let msg = 'Check this out! '+ "<br><br>" +' <strong>Title</strong> :' + item.title + "<br><br>" + '<strong>Type</strong> :' + item.type + "<br><br>" + '<strong>Location</strong> :' + item.location + "<br><br>" + '<strong>budget</strong> :' + item.budget + "<br><br>" + urlLink;
      // encodeURIComponent(msg);
      this.socialSharing.shareViaFacebook(msg, null, u).then(() => {
        this.apiService.showToast("Shared successfully", false, '', 'bottom', 2000); 
      }).catch((e) => {
        this.apiService.showToast("failed to share : " + e, false, '', 'bottom', 2000);
      });
    }else if(type == 'tw'){
      // let msg = 'Check this out! '+ "<br><br>" +' *Title</strong> :' + item.title + "<br><br>" + '<strong>Type</strong> :' + item.type + "<br><br>" + '<strong>Location</strong> :' + item.location + "<br><br>" + '<strong>budget</strong> :' + item.budget + "<br><br>"+ urlLink ;
      // encodeURIComponent(msg);
      let msg = 'Hi,';
      let u = 'https://ionicframework.com/';
      this.socialSharing.shareViaTwitter(msg, null, u).then(() => {
        this.apiService.showToast("Shared successfully", false, '', 'bottom', 2000); 
      }).catch((e) => {
        this.apiService.showToast("failed to share : " + e, false, '', 'bottom', 2000);
      });
    }else if(type == 'other'){
      let msg = 'Check this out! '+ "\r\n\r\n" +'*Title* :' + item.title + "\r\n\r\n" + '*Property Type* :' + item.type + "\r\n\r\n" + '*Property Location* :' + item.location + "\r\n\r\n" + '*Budget* :' + item.budget + "\r\n\r\n" + '*Terms* :' + item.terms + "\r\n\r\n" + '*Area* :' + item.area + "\r\n\r\n"+ '*Dimension* :' + item.dimension + "\r\n\r\n"+ '*Facing* :' + item.facing + "\r\n\r\n"+ '*Contact number* :' + item.contact + "\r\n\r\n";
      encodeURIComponent(msg);
      this.socialSharing.share(msg, 'SI RE', null, urlLink).then(() => {
        // this.apiService.showToast("Shared successfully", false, '', 'bottom', 2000); 
      }).catch((e) => {
        this.apiService.showToast("failed to share : " + e, false, '', 'bottom', 2000);
      });
    }
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
