//babysitter service
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class BabysitterService {
  authToken: any;
  tasklist: any;

  private userId: any;

  setUserId(userId: any) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private getAccessTokenFromCookie(): string {
    const accessToken = this.cookieService.get('access_token');
    return accessToken;
  }

  getRequestForms(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/babysitter/getRequestForms/${userId}`, { headers });
  }
}
