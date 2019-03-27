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
 	messageFormReq = {};
userInfo= {};

  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.userInfo = this.apiService.getSessionData();
    this.logoPath = '../../assets/images/logo.png';

      this.messageForm = this.formBuilder.group({
      phone: [this.userInfo['phone'], Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      subject: ['', Validators.compose([Validators.required])],
      message: ['',Validators.compose([Validators.required])],
     });

    }

 
    sendmessage(){
    if(this.messageForm.valid){
      
      this.messageFormReq = Object.assign({}, this.messageForm.value);
      this.apiService.sendmail(this.messageFormReq).subscribe(res => {
        this.apiService.hideLoading();
        if(!!res['status'] && res['status'] == "Success"){
          this.apiService.showToast("Your message has been sent successfully. ", true, "close", "bottom", 1000);
         }else{
          this.apiService.showToast((!!res['msg'] ) ? res['msg'] : "Message sending failed", true, "close", "bottom", 1000);
        }
        
      },error => {
        this.apiService.hideLoading();
        this.apiService.checkConnectivity();
      });

    }
  }

}