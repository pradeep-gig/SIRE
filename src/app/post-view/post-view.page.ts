import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.page.html',
  styleUrls: ['./post-view.page.scss'],
})
export class PostViewPage implements OnInit {
  logoPath: string;
  postingInfo = {};
  displayInfo = [];
  constructor() { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';
    this.postingInfo =  {
      "id": 56,
      "user": "1",
      "title": "test",
      "content": "",
      "typeofpost": "requirement",
      "location": "Chennai",
      "area": "test",
      "condition": "Old",
      "terms": "For Rental",
      "type": "House",
      "dimension": "123",
      "facing": "east",
      "landmark": "test",
      "budget": "1000",
      "contact": "9874563120",
      "comment": ""
    };
    
    for(let post in this.postingInfo){
      if(post != 'id' && post != 'user' && this.postingInfo[post] != ''){
        let obj = {'name': post, 'value': this.postingInfo[post]};
        this.displayInfo.push(obj);
      }
    }

  }

}
