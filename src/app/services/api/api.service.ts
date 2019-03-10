import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  restBaseUrl = 'https://sire-vinogautam.c9users.io/wp-admin/admin-ajax.php?action=';

  Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
  };

  constructor(private http: HttpClient, public toastController: ToastController) { }

  getStates(){
    return this.http.get('../../../assets/json/stateAndCity.json');
  }

  getpost(){
    return this.http.get(this.restBaseUrl+"post_list");
  }

  createPost(data){
    return this.http.post(this.restBaseUrl+"add_update_post" , data, this.Options);
  }

  checkConnectivity(){
    this.showToast('Please check your connectivity or might be temporary down time', false, '', 'bottom', 2000);
  }

  createUser(data){
    return this.http.post(this.restBaseUrl+"create_user" , data, this.Options);
  }

  sendOtp(data){
    return this.http.post(this.restBaseUrl+"generate_otp" , data, this.Options);
  }

  showLoading() {
    document.getElementById('spinner-container').style.display = 'block';
  }

  hideLoading() {
    document.getElementById('spinner-container').style.display = 'none';
  }

  async showToast(msg, closeBtn, closeText, postion, duration){
    const toast = await this.toastController.create({
      message: msg,
      duration: duration,
      showCloseButton: closeBtn,
      position: postion,
      closeButtonText: closeText
    });
    toast.present();
  }

  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
}
