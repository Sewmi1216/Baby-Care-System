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

  getParents(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/babysitter/getParents`, { headers });
  }

  getRequestForm(user:any, requestFormId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log(requestFormId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/babysitter/getRequestForm/${requestFormId}`, { headers });
  }

  getTodayTaskList(user:any) : Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('Request headers:', headers);
    //console.log(userId); // working
    return this.http.get<any>(`${environment.backend_url}/babysitter/getTodayTaskList/${userId}`, {headers});
  }


  updateRequestForm(requestForm: any, requestFormId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });

    const requestBody = {
      requestForm: requestForm,
    };

    console.log(requestBody);
    return this.http.put<any>(`${environment.backend_url}/babysitter/updateRequestForm/${requestFormId}`, JSON.stringify(requestBody),{ headers });
  }

  getParent(userId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log(userId)
    return this.http.get<any>(`${environment.backend_url}/babysitter/getParent/${userId}`);      
  }

  getParentDetails(userId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log(userId)
    return this.http.get<any>(`${environment.backend_url}/babysitter/getParentDetails/${userId}`);      
  }
}
