import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.page.html',
  styleUrls: ['./create-post.page.scss'],
})
export class CreatePostPage implements OnInit {
  logoPath: string;
  postForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';

    this.postForm = this.formBuilder.group({
      postType: ['', Validators.compose([])],
      title: ['', Validators.compose([])],
      location: ['', Validators.compose([])],
      propertyArea: ['',Validators.compose([])],
      propertCondition: ['',Validators.compose([])],
      terms: ['',Validators.compose([])],
      propertyType: ['',Validators.compose([])],
      area: ['',Validators.compose([])],
      dimension: ['',Validators.compose([])],
      facing: ['',Validators.compose([])],
    });
  }

}
