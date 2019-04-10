import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public router: Router) { }
  logoPath: string;
  searchInput: string;
  showSearch : boolean = false;
  ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
  }

  enableSearch(){
    this.showSearch = true;
  }

  // changeType(){

  // }

  search(e){
    localStorage.setItem('search', this.searchInput);
    this.router.navigate(['/listing']);
  }

  onCancel(e){
    const subscription = setTimeout(() => {
      console.log(this.searchInput);
    }, 500);
  }

}
