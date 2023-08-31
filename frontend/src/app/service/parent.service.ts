import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  authToken: any;
  tasklist: any;
  baby:any;
  babyProfile:any;

  private userId: any;

  setUserId(userId: any) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  addTaskList(tasklist:any): Observable<any>{
    return this.http.post<any>(environment.backend_url + "/parent/addTaskList", tasklist)
  }
  addBaby(baby: any, userID: any): Observable<any> {
    const requestBody = {
      baby: baby,
      userID: userID
    };

    return this.http.post<any>(environment.backend_url + "/parent/addBaby", requestBody);
  }
  // getBabies(): Observable<any> {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.get<any>(environment.backend_url + "/parent/getBabies",{headers:headers}).map(res =>res.json());
  // }
  getBabies(): Observable<any> {
    const accessToken = this.cookieService.get('access_token'); // Retrieve token from cookies
console.log(accessToken)
    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.get<any>(`${environment.backend_url}/parent/getBabies`, { headers });
  }

  loadToken() {
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

}
