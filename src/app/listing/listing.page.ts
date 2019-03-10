import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
// import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  logoPath: string;
  Postings: Array<any>;
  showNext: boolean = false;
  constructor( private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';
    this.Postings = [];
    this.apiService.showLoading();
    this.apiService.getpost().subscribe(res => {
      this.apiService.hideLoading();
      if(res['status'] == 'Success'){
        this.Postings = res['data'];
      }
    },error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  viewDetails(data) {
    this.router.navigate(['/post-view/' + data.id]);
  }

  // openMenu() {
  //   this.menu.enable(true, 'sideBarMenu');
  //   this.menu.open('sideBarMenu');
  // }


}
