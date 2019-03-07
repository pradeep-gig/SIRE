import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {

  restBaseUrl = 'https://sire-vinogautam.c9users.io/wp-admin/admin-ajax.php?action=';

  Options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-HTTP-Method-Override':'POST'
      })
  };

  constructor(private http: HttpClient) { }

  getStates(){
    return this.http.get('../../../assets/json/stateAndCity.json');
  }

  createPost(data){
    return this.http.post(this.restBaseUrl+"add_update_post" , data, this.Options);
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
