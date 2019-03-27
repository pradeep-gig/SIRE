import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  logoPath: string;
  messageForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService, private router: Router) { }

  ngOnInit() {
   
    this.logoPath = '../../assets/images/logo.png';

      this.messageForm = this.formBuilder.group({
      phone: [this.userInfo['phone'], Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      message: ['',Validators.compose([Validators.required])],
     });

    this.onChanges();
  }

  onChanges(): void {
    this.registerForm.valueChanges.subscribe(val => {
      console.log(val);
      if(!!val.state && val.state != ''){
        // console.log(this.stateCityList[val.state]);
        this.city = this.stateCityList[val.state];
      }
    });
  }

  generateOtp(){
    this.apiService.showLoading();
    this.apiService.sendOtp({'phone': this.registerForm.value.phone}, true).subscribe(res => {
    this.apiService.hideLoading();
     if(res['status'] == 'Success'){
      this.sendOtp = true;
      this.showOtp = false;
      this.isRegister = true;
      this.otp = res['otp'];
     }else{
       this.apiService.showToast(res['msg'], false, '', 'bottom', 2000);
     }
    }, error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  register(){
    if(this.registerForm.valid && this.otp == this.registerForm.value.otp){
      
      this.registerFormReq = Object.assign({}, this.registerForm.value);
      delete this.registerFormReq['otp'];
      this.apiService.showLoading();
      this.apiService.createUser("sire_create_user",this.registerFormReq).subscribe(res => {
        this.apiService.hideLoading();
        if(!!res['status'] && res['status'] == "Success"){
          this.apiService.showToast("Registered sucessfully, Please login. ", true, "close", "bottom", 1000);
          this.registerFormReq['userId'] = res['id'] ;
          sessionStorage.setItem('userdata', JSON.stringify(this.registerFormReq));
          this.router.navigate(['/login']);
        }else{
          this.apiService.showToast((!!res['msg'] ) ? res['msg'] : "Registration failed", true, "close", "bottom", 1000);
        }
        
      },error => {
        this.apiService.hideLoading();
        this.apiService.checkConnectivity();
      });

    }else{
      this.apiService.showToast("Please enter a valid OTP, to register", false, '', 'bottom', 2000);
    }
  }

}