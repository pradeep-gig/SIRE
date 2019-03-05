import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
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

  constructor(private formBuilder: FormBuilder, 
    private apiService: ApiService
    ) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';

    this.apiService.getStates().subscribe(res => {
      this.stateCityList = res;
      for(let state in this.stateCityList){
        this.state.push(state);
      }
    });

    this.registerForm = this.formBuilder.group({
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      firstname: ['', Validators.compose([])],
      lastname: ['', Validators.compose([])],
      state: ['',Validators.compose([])],
      city: ['',Validators.compose([])],
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

}
