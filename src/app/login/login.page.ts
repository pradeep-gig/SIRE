import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  logoPath: string;
  loginForm: FormGroup;
  sendOtp: boolean;
  showOtp: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { 
    
  }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo-circle.png';
    this.sendOtp = false;
    this.showOtp = false;

    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      otp: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]{4,6}$/) ])]
    });

    this.loginForm.valueChanges.subscribe(val => {
      if(this.loginForm.controls.phone.status == "VALID" && !this.sendOtp){
        this.showOtp = true;
      }else{
        this.showOtp = false;
      }
    });
  }

  login(){
    if(this.loginForm.valid){
      this.router.navigate(['/listing']);
    }
  }

  generateOtp(){
    this.apiService.showLoading();
    this.apiService.sendOtp({'phone': this.loginForm.value.phone}).subscribe(res => {
    this.apiService.hideLoading();
     if(res['status'] == 'Success'){
      this.sendOtp = true;
      this.showOtp = false;
	sessionStorage.setItem('userdata', JSON.stringify(res['user']));
     }else{
       this.apiService.showToast(res['msg'], false, '', 'bottom', 2000);
     }
    }, error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  

}
