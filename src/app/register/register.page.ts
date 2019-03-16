import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  logoPath: string;
  registerForm: FormGroup;
  stateCityList = {};
  state = [];
  city = [];
  registerFormReq = {};
  constructor(private formBuilder: FormBuilder,
    private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';

    this.apiService.getStates().subscribe(res => {
      this.stateCityList = res;
      for(let state in this.stateCityList){
        this.state.push(state);
      }
    }, error => {
      console.log(error);
    });

    this.registerForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      state: ['',Validators.compose([Validators.required])],
      city: ['',Validators.compose([Validators.required])],
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

  register(){
    if(this.registerForm.valid){
      this.registerFormReq = Object.assign({}, this.registerForm.value);
      this.apiService.showLoading();
      this.apiService.createUser("create_user",this.registerFormReq).subscribe(res => {
        this.apiService.hideLoading();
        if(!!res['status'] && res['status'] == "Success"){
          this.apiService.showToast("Registered sucessfully, Please login. ", true, "close", "bottom", 1000);
          this.registerFormReq['userId'] = res['id'] ;
          sessionStorage.setItem('userdata', JSON.stringify(this.registerFormReq));
          this.router.navigate(['/login']);
        }else{
          this.apiService.showToast("Registration failed", true, "close", "bottom", 1000);
        }
        
      },error => {
        this.apiService.hideLoading();
        this.apiService.checkConnectivity();
      });

    }
  }

}
