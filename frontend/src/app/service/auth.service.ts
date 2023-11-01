import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  useraccount :any;

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  accLogin(user: any): Observable<any> {
    // const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.post<any>(`${environment.backend_url}/user/login`, user, { headers });
    return this.http.post<any>(environment.backend_url + "/user/login", user);
  }
  register(useraccount:any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/parent/addParent", useraccount);
  }
  registerBabysitter(useraccount:any): Observable<any> {
    console.log(useraccount)
    return this.http.post<any>(environment.backend_url + "/babysitter/addBabysitter",useraccount);
 }
  storeToken(tokenValue:string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  logout(){
    localStorage.clear();
  }

  private getAccessTokenFromCookie(): string {
    const accessToken = this.cookieService.get('access_token');
    return accessToken;
  }

  forgetPassword(user: any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/user/forget_password", user);
  }
  resetPassword(user: any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/user/reset-password", user);
  }

  getUser(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/user/getUser/${userId}`, { headers });
  }
  getImg(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    return this.http.get<any>(`${environment.backend_url}/user/getImg/${userId}`, { headers });
  }
}

