import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  termsconditions = {'post_title': '', 'post_content': ''};
  logoPath: string;

  constructor(private apiService: ApiService) { this.apiService.termsconditions().subscribe(res => {
  		this.termsconditions=res['data'];
  	});
  }

  ngOnInit() {
 this.logoPath = '../../assets/images/logo-create.png';
  }

}
