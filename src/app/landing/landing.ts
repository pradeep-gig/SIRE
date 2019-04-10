import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
	userCnt = 0;
  constructor(private apiService: ApiService, public router: Router) {
    // if(this.apiService.getSessionData()){
    //   this.router.navigate(['/listing']);
    // }
  	this.apiService.gettotaluser().subscribe(res => {
  		this.userCnt=res['data'];
  	});
  }

}

