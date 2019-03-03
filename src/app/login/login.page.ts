import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  logoPath: string;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo-circle.png';

    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      otp: ['', Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6)])]
    });
  }

  

}
