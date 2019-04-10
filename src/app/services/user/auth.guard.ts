import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public apiService: ApiService, public router: Router){

  }
  canActivate() {
    console.log('i am checking to see if you are logged in');
    if(this.apiService.getSessionData()){
      return true;
    }else{
      this.router.navigate(['/landing']);
    }
   
  }
}
