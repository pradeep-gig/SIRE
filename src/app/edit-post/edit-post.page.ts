import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormArray  } from '@angular/forms';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';


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
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.apiService.getStates().subscribe(res => {
      for (let state in res) {
        if (state == 'Tamil Nadu') {
          this.state = res[state];
        }
      }
    });
    this.logoPath = '../../assets/images/logo.png';
    let postData = {
      "id": 57,
      "user": "1",
      "title": "Need 2 grounds property in ashok nagar",
      "content": "",
      "post_date": "2019-03-10 16:45:04",
      "typeofpost": "requirement",
      "location": "Chennai",
      "area": "2400",
      "condition": "New",
      "terms": "For Sale",
      "type": "Land",
      "dimension": "40 by 60",
      "facing": "all",
      "landmark": "near pillar",
      "budget": "333",
      "contact": "9871042906,1234567890",
      "comment": "this is a test message"
    }
    this.postForm = this.formBuilder.group({
      typeofpost: [postData.typeofpost, Validators.compose([Validators.required])],
      title: [postData.title, Validators.compose([Validators.required])],
      location: [postData.location, Validators.compose([])],
      condition: [postData.condition,Validators.compose([Validators.required])],
      terms: [postData.terms,Validators.compose([Validators.required])],
      type: [postData.type,Validators.compose([Validators.required])],
      area: [postData.area,Validators.compose([])],
      dimension: [postData.dimension,Validators.compose([])],
      facing: [postData.facing,Validators.compose([])],
      landmark: [postData.landmark,Validators.compose([])],
      budget: [postData.budget,Validators.compose([Validators.required])],
      contacts: this.formBuilder.array([]),
      comment: [postData.comment,Validators.compose([])],
    });
    this.addContactValues(postData.contact);
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
    this.postCreateObj = Object.assign({'user': 1}, this.postForm.value);
    
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
