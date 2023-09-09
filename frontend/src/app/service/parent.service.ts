//parent service
import {Injectable} from '@angular/core';
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
  baby: any;
  babyProfile: any;

  private userId: any;

  setUserId(userId: any) {
    this.userId = userId;
  }

  getUserId() {
    return this.userId;
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  addTaskList(tasklist: any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/parent/addTaskList", tasklist)
  }

  addBaby(baby: any, userID: any): Observable<any> {
    const requestBody = {
      baby: baby,
      userID: userID
    };

    return this.http.post<any>(environment.backend_url + "/parent/addBaby", requestBody);
  }

  // @ts-ignore
  getBabies(user): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabies/${userId}`, { headers });
  }

  private getAccessTokenFromCookie(): string {
    const accessToken = this.cookieService.get('access_token');
    return accessToken;
  }

  // loadToken() {
  //   const token = localStorage.getItem('token');
  //   this.authToken = token;
  // }

  addRequestForm(requestForm: any, userString: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Set the content type to JSON
    });

    const requestBody = {
      requestForm: requestForm,
      userID: userString.id,
    };
    console.log(requestBody)

    return this.http.post<any>(`${environment.backend_url}/parent/addRequestForm`, JSON.stringify(requestBody), { headers });
  }

  getBabysitters(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabysitters`, { headers });
  }

  getBabysitter(babysitterID: any): Observable<any> {
    const babysitterId = babysitterID
    console.log(babysitterId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    // const userId = user.id;
    // console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabysitters/${babysitterId}`, { headers });
  }

  getRequestForms(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getRequestForms/${userId}`, { headers });
  }

  deleteRequestForm(user:any, requestFormId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.delete<any>(`${environment.backend_url}/parent/deleteRequestForm/${requestFormId}`, { headers });
  }

}
