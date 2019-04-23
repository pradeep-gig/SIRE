import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.page.html',
  styleUrls: ['./edit-post.page.scss'],
})
export class EditPostPage implements OnInit {
  logoPath: string;
  postForm: FormGroup;
  state = [];
  postCreateObj = {};
  contacts: FormArray;
  postData: any;
  showForm = false;
  count: any;
  showCount = false;
  
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ionViewDidEnter(){
    var cnt = localStorage.getItem('count');
    if(!!cnt){
      this.count = cnt;
      this.showCount = true;
    }
  }

  public async ngOnInit() {
    this.apiService.getStates().subscribe(res => {
      for (let state in res) {
        if (state == 'Tamil Nadu') {
          this.state = res[state];
        }
      }
    });
    this.apiService.getSinglePost(this.activatedRoute.snapshot.paramMap.get('id')).subscribe(res => {
      this.apiService.hideLoading();
      if(res['status'] == "Success"){
        if(!!res['data']){
          this.postData = res['data'];
          this.buildForm();
          this.showForm = true;
        }
      }else{
        this.showForm = false;
        this.apiService.showToast((!!res['msg']) ? res['msg'] : "Failed to Fetch post details", true, "close", "bottom", 1000);
      }
    }, err => {
      this.apiService.hideLoading();
      this.apiService.checkConnectivity();
    });
    

   this.logoPath = '../../assets/images/logo-create.png';

    
  }

  buildForm(){
    this.postForm = this.formBuilder.group({
      typeofpost: [this.postData.typeofpost, Validators.compose([Validators.required])],
      title: [this.postData.title, Validators.compose([Validators.required])],
      location: [this.postData.location, Validators.compose([])],
      condition: [this.postData.condition,Validators.compose([Validators.required])],
      terms: [this.postData.terms,Validators.compose([Validators.required])],
      type: [this.postData.type,Validators.compose([Validators.required])],
      area: [this.postData.area,Validators.compose([])],
      dimension: [this.postData.dimension,Validators.compose([])],
      facing: [this.postData.facing,Validators.compose([])],
      landmark: [this.postData.landmark,Validators.compose([])],
      budget: [this.postData.budget,Validators.compose([Validators.required])],
      contact: [this.postData.contact,Validators.compose([Validators.required])],
      comment: [this.postData.comment,Validators.compose([])],
    });
  }

  addContactValues(contacts){
    this.contacts = this.postForm.get('contacts') as FormArray;
    for(let contact of contacts.split(',')){
      this.contacts.push(this.createContacts(contact));
    }
  }
  createContacts(value?): FormGroup {
   return this.formBuilder.group({
      contact: [ value? value :'', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]
    });
  }

  addContact(): void {
    this.contacts = this.postForm.get('contacts') as FormArray;
    this.contacts.push(this.createContacts());
  }

  removeContact(i: number) {
    this.contacts.removeAt(i);
  }

  postSubmit() {
    this.postCreateObj = Object.assign({'user': 1, 'ID': this.activatedRoute.snapshot.paramMap.get('id')}, this.postForm.value);
    
    for (var propName in this.postCreateObj) { 
      if (this.postCreateObj[propName] == "") {
        delete this.postCreateObj[propName];
      }
      if (propName == "contacts") {
        let contact="";
        for (let obj of this.postCreateObj[propName]) {
          contact += (contact === "") ? obj.contact : ',' + obj.contact;
        }
        this.postCreateObj['contact'] = contact;
        delete this.postCreateObj[propName];
      }
    }
    this.apiService.showLoading();
    this.apiService.createPost("add_update_post",this.postCreateObj).subscribe(res => {
      this.apiService.hideLoading();
      if(!!res['status'] && res['status'] == "Success"){
        // this.apiService.showToast("Posting done", true, "close", "bottom", 1000);
        this.router.navigate(['/home']);
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
