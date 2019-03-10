import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  logoPath: string;
  view: String;
  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';
    this.view = 'myPosting';
  }

  segmentChanged(e){
    console.log(e);
  }
}
