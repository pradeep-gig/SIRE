import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  count: any;
  showCount = false;
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private socialSharing: SocialSharing) {

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
    var cnt = localStorage.getItem('count');
    if(!!cnt){
      this.count = cnt;
      this.showCount = true;
    }
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
  
  async share(type, item) {
    // Text + Image or URL works
    let urlLink = "sireapp://sireapp.com/post?id="+item.id;
     urlLink = this.apiService.restBaseUrl +"app_redirect&url="+btoa(urlLink);
    
     if(type == 'other'){
      let msg = 'Check this out! '+ "\r\n\r\n" +'*Title* :' + item.title + "\r\n\r\n" + '*Property Type* :' + item.type + "\r\n\r\n" + '*Property Location* :' + item.location + "\r\n\r\n" + '*Budget* :' + item.budget + "\r\n\r\n" + '*Terms* :' + item.terms + "\r\n\r\n" + '*Area* :' + item.area + "\r\n\r\n"+ '*Dimension* :' + item.dimension + "\r\n\r\n"+ '*Facing* :' + item.facing + "\r\n\r\n"+ '*Contact number* :' + item.contact + "\r\n\r\n";
      encodeURIComponent(msg);
      var appLink = 'https://play.google.com/store/apps/details?id=com.isoft.sire';
      this.socialSharing.share(msg, 'SI RE', null, appLink).then(() => {
        // 
      }).catch((e) => {
        
      });
    }
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
