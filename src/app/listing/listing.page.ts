import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
})
export class ListingPage implements OnInit {
  logoPath: string;
  items: Array<any>;
  constructor() { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo.png';
    this.items = [
      {
        'title': "Title",
        'description': "description goes here",
        'area': "1000 sq ft",
        'location': "chennai, velachery",
        'price': 12000
      },
      {
        'title': "Title 1",
        'description': "description goes here",
        'area': "900 sq ft",
        'location': "chennai, arumbakkam",
        'price': 8000
      },
      {
        'title': "Title 2",
        'description': "description goes here",
        'area': "750 sq ft",
        'location': "chennai, porur",
        'price': 5000
      },
      {
        'title': "Title 3",
        'description': "description goes here",
        'area': "1200 sq ft",
        'location': "chennai, vadapalani",
        'price': 11000
      }
    ];
  }

}
