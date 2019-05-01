import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  logoPath: string;
  postForm: FormGroup;
  state = [];
  postCreateObj = {};
  contacts: FormArray;
  userInfo = {};
  count: any;
  showCount = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }
 
  ionViewDidEnter(){
    var cnt = localStorage.getItem('count');
    if(!!cnt){
      this.count = cnt;
      this.showCount = true;
    } 
      this.buildForm();
  }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.userInfo = this.apiService.getSessionData();
    this.apiService.getStates().subscribe(res => {
      for(let state in res){
        if(state == 'Tamil Nadu'){
          this.state = res[state];
        }
      }
    });

    //contact: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
    
  }

  buildForm(){
    this.postForm = this.formBuilder.group({
      typeofpost: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([])],
      condition: ['', Validators.compose([Validators.required])],
      terms: ['', Validators.compose([Validators.required])],
      type: ['', Validators.compose([Validators.required])],
      area: ['', Validators.compose([])],
      dimension: ['', Validators.compose([])],
      facing: ['', Validators.compose([])],
      landmark: ['', Validators.compose([])],
      budget: ['', Validators.compose([Validators.required])],
      contact: [this.userInfo['phone'], Validators.compose([Validators.required])],//this.formBuilder.array([this.createContacts(this.userInfo['phone'])]),
      comment: ['', Validators.compose([])],
    });
  }

  createContacts(phone): FormGroup {
    return this.formBuilder.group({
      contact: [(!!phone && phone != '') ? phone : "", Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });
  }

  addContact(): void {
    this.contacts = this.postForm.get('contacts') as FormArray;
    this.contacts.push(this.createContacts(''));
  }

  removeContact(i: number) {
    this.contacts.removeAt(i);
  }

  postSubmit() {
    this.postCreateObj = Object.assign({'user': this.userInfo['ID'], 'createdBy': this.userInfo['phone']}, this.postForm.value);
    
    for (var propName in this.postCreateObj) { 
      if (this.postCreateObj[propName] == "") {
        delete this.postCreateObj[propName];
      }
    }
    this.apiService.showLoading();
    var that = this;
    this.apiService.createPost("add_update_post",this.postCreateObj).subscribe(res => {
      this.apiService.hideLoading();
      if(!!res['status'] && res['status'] == "Success"){
        // this.apiService.showToast("Posting done", true, "close", "bottom", 1000);
        var postDetails = Object.assign({}, this.postCreateObj);
        postDetails['id'] = res['data'];
        localStorage.setItem('postInfo', JSON.stringify(postDetails));
        this.router.navigate(['/listing']);
      }else{
        this.apiService.showToast("Posting failed", true, "close", "bottom", 1000);
      }

    },error => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
  }

  clear() {
    this.postForm.reset();
  }
}
