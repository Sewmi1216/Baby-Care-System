import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  accLogin(user:any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/parent/login", user);
  }

  accLogout() {
    // this.navBarService.logged = false;
    localStorage.clear();
  }
}
