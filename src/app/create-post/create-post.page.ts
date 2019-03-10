import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
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
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';

    this.apiService.getStates().subscribe(res => {
      console.log(res);
      for(let state in res){
        if(state == 'Tamil Nadu'){
          this.state = res[state];
        }
      }
    });

    this.postForm = this.formBuilder.group({
      typeofpost: ['', Validators.compose([Validators.required])],
      title: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([])],
      condition: ['',Validators.compose([Validators.required])],
      terms: ['',Validators.compose([Validators.required])],
      type: ['',Validators.compose([Validators.required])],
      area: ['',Validators.compose([])],
      dimension: ['',Validators.compose([])],
      facing: ['',Validators.compose([])],
      landmark: ['',Validators.compose([])],
      budget: ['',Validators.compose([Validators.required])],
      contact: ['',Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      comment: ['',Validators.compose([])],
    });
  }

  postSubmit() {
    this.postCreateObj = Object.assign({'user': 1}, this.postForm.value);
    
    for (var propName in this.postCreateObj) { 
      if (this.postCreateObj[propName] == "") {
        delete this.postCreateObj[propName];
      }
    }
    this.apiService.showLoading();
    this.apiService.createPost(this.postCreateObj).subscribe(res => {
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
