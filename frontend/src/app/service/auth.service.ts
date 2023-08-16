import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  useraccount :any;
  constructor(private http: HttpClient) { }
  register(useraccount:any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/parent/addParent", useraccount);
  }
  registerBabysitter(useraccount:any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/babysitter/addBabysitter", useraccount);
  }
}
