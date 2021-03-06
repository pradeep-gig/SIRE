import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform,
    public apiService: ApiService
  ) { }

  async getToken(userId) {
    let token;
    token = await this.firebaseNative.getToken(); 
    return this.saveTokentoDb(token, userId);
  }

  private saveTokentoFireStore(token, userPhone){
    if(!token) return;
    const deviceRef = this.afs.collection('devices');

    const docData = {
      token,
      userId: userPhone,
    }

    localStorage.setItem('token', token);

    return deviceRef.doc(token).set(docData);

  }
  
  private saveTokentoDb(token, userId){
    if(!token) return;

    const docData = {
      token,
      user_id: userId,
    }

    this.apiService.setToken(docData).subscribe(function(res){
      localStorage.setItem('token', token);
    });

  }

  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen()
  }

}
