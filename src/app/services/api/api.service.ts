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

  getpost(offset, query){
    return this.http.get(this.restBaseUrl+"post_list&start="+offset+"&type="+query.type+"&location="+query.location+"&typeofpost="+query.typeofpost);
  }

  gettotaluser(){
    return this.http.get(this.restBaseUrl+"get_total_users");
  }

  termsconditions(){
    return this.http.get(this.restBaseUrl+"terms_condition");
  }

  getSinglePost(id){
    return this.http.get(this.restBaseUrl+"get_single_post&id="+id);
  }

  getUserPost(id){
    return this.http.get(this.restBaseUrl+"get_user_post&user_id="+id);
  }

  createPost(url: string, data){
    return this.http.post(this.restBaseUrl+url , data, this.Options);
  }

  sendmail(data){
    return this.http.post(this.restBaseUrl+'sendmail' , data, this.Options);
  }

  checkConnectivity(){
    this.showToast('Please check your connectivity or might be temporary down time', false, '', 'bottom', 2000);
  }

  createUser(url: string,data){
    return this.http.post(this.restBaseUrl+url , data, this.Options);
  }
  
  deletePost(data){
    return this.http.post(this.restBaseUrl+"delete_post", data, this.Options);
  }

  sendOtp(data, isRegister){
    if(isRegister){
      return this.http.post(this.restBaseUrl+"generate_otp&flag=register" , data, this.Options);
    }else{
      return this.http.post(this.restBaseUrl+"generate_otp" , data, this.Options);
    }
  }

  showLoading() {
    document.getElementById('spinner-container').style.display = 'block';
  }

  hideLoading() {
    document.getElementById('spinner-container').style.display = 'none';
  }

   getUserpost(userId){
    return this.http.get(this.restBaseUrl+"get_user_post?user_id="+userId);
  }

  fetchPost(data){
    return this.http.get(this.restBaseUrl+"get_single_post&id="+data);
  }

  setSessionData(data){
    localStorage.setItem('userdata', JSON.stringify(data));
  }

  getSessionData(){
    return JSON.parse(localStorage.getItem('userdata'));
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

  setToken(data){
    return this.http.post(this.restBaseUrl+"update_token", data, this.Options);
  }

  fetchNotification(userId, start){
    return this.http.get(this.restBaseUrl+"noti_list&user="+userId + "&start="+start);
  }

  ReadNotification(data){
    return this.http.post(this.restBaseUrl+'read_noti', data, this.Options)
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
