import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
	userCnt = 0;
  constructor(private apiService: ApiService) {
  	this.apiService.gettotaluser().subscribe(res => {
  		this.userCnt=res['data'];
  	});
  }

}

