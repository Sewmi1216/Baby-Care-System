import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  useraccount :any;
  constructor(private http: HttpClient) { }

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















}
