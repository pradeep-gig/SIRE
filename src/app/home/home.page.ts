import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  logoPath: string;
  view: String;
  stateCityList = {};
  state = [];
  city = [];
  updateForm: FormGroup;
  postForm:  FormGroup;
  isLoadProfile: boolean =true;
  userData: any;
  Postings: [];
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) {

  }

  public async ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.view = 'myPosting';
    this.userData = JSON.parse(localStorage.getItem('userdata'));
    if(this.userData){
      this.getPost();
    }else{
      this.router.navigate(['/landing']);
    }
    // this.apiService.getUserpost(this.userData.userId).subscribe(res => {
    //   console.log(res)
    // }, error => {
    //   console.log(error);
    // });

    
  }

  ionViewDidEnter(){
    this.view = 'myPosting';
    this.getPost();
  }

  getPost() {
    this.Postings = [];
    this.apiService.showLoading();
    this.apiService.getUserPost(this.userData['ID']).subscribe(res => {
      this.apiService.hideLoading();
      if(res['status'] == 'Success'){
        if(res['data'].length > 0){
          this.Postings =Object.assign([],res['data']);
        }
      }
    },error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  editPost(data){
    // this.router.navigate(['/edit-post/' + data.id]);
    this.router.navigate(['/edit-post/' + data.id]);
    // this.router.navigate(['/post-view/' + data.id]);
  }

  deletePost(data){
    this.apiService.showLoading();
    this.apiService.deletePost({'id': data.id}).subscribe(res => {
      this.apiService.hideLoading();
      if(!!res['status'] && res['status'] == "Success"){
        this.apiService.showToast("Post deleted sucessfully", true, "close", "bottom", 1000);
        this.getPost();
      }else{
        this.apiService.showToast((!!res['msg'] ) ? res['msg'] : "Post delete failed", true, "close", "bottom", 1000);
      }
    },err => {
      this.apiService.hideLoading();
        this.apiService.checkConnectivity();
    });
  }

  loadProfileData(userData: any) {
    this.apiService.getStates().subscribe(res => {
      this.stateCityList = res;
      for (let state in this.stateCityList) {
        this.state.push(state);
      }
      if (userData.state) {
        this.city = this.stateCityList[userData.state];
      }
    }, error => {
      console.log(error);
    });

    this.updateForm = this.formBuilder.group({
      phone: [userData.phone, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      firstname: [userData.firstname, Validators.compose([Validators.required])],
      lastname: [userData.lastname, Validators.compose([Validators.required])],
      state: [userData.state, Validators.compose([Validators.required])],
      city: [userData.city, Validators.compose([Validators.required])],
      id: [userData.userId]
    });
    this.onChanges();
  }

  onChanges(): void {
    this.updateForm.valueChanges.subscribe(val => {
      console.log(val);
      if (!!val.state && val.state != '') {
        this.city = this.stateCityList[val.state];
      }
    });
  }


  update() {
    if (this.updateForm.valid) {
      let updateFormReq = Object.assign({'ID': this.userData['ID']}, this.updateForm.value);
      this.apiService.showLoading();
      this.apiService.createUser("sire_create_user", updateFormReq).subscribe(res => {
        this.apiService.hideLoading();
        if (!!res['status'] && res['status'] == "Success") {
          this.apiService.showToast("Updated sucessfully", true, "close", "bottom", 1000);
          localStorage.setItem('userdata', JSON.stringify(updateFormReq));
        } else {
          this.apiService.showToast("Failed to Update", true, "close", "bottom", 1000);
        }
      }, error => {
        this.apiService.hideLoading();
        this.apiService.checkConnectivity();
      });

    }
  }

  segmentChanged(e) {
    console.log(e);
    if(e === "updateProfile" && this.isLoadProfile && this.userData){
      this.loadProfileData(this.userData);
      this.isLoadProfile = false;
    }
  }
}
