import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
// import { MenuController } from '@ionic/angular';

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
  constructor( private apiService: ApiService, private router: Router) {
    this.segmentType = "availablity";
    this.Postings =[];
   }

   public async ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';
    this.PostingsResp = [];
    this.apiService.showLoading();
    this.fetchPosting(0);
  }

  fetchPosting(offset){
    this.apiService.getpost(offset).subscribe(res => {
      this.apiService.hideLoading();
      if(res['status'] == 'Success'){
        if(res['data'].length > 0){
          this.PostingsResp = Object.assign([],res['data']);
          this.populateListings();
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
    this.segmentType = value;
    this.populateListings();
  }

  // openMenu() {
  //   this.menu.enable(true, 'sideBarMenu');
  //   this.menu.open('sideBarMenu');
  // }


}
