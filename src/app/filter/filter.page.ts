import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  logoPath: string;
  state = [];
  search = {'typeofpost': '', 'location': '', 'type': ''};
  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.logoPath = '../../assets/images/logo-create.png';
    this.apiService.getStates().subscribe(res => {
      for(let state in res){
        if(state == 'Tamil Nadu'){
          this.state = res[state];
        }
      }
    });
  }

  filter(){
    localStorage.setItem('search', JSON.stringify(this.search));
    this.router.navigate(['/listing']);
  }

}
