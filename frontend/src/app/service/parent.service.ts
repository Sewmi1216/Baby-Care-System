import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  tasklist: any;
  baby:any;

  private userId: any;

  setUserId(userId: any) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }
  constructor(private http: HttpClient) { }
  addTask(tasklist:any): Observable<any>{
    return this.http.post<any>(environment.backend_url + "/parent/addTask", tasklist)
  }
  addBaby(baby: any, userID: any): Observable<any> {
    const requestBody = {
      baby: baby,
      userID: userID
    };

    return this.http.post<any>(environment.backend_url + "/parent/addBaby", requestBody);
  }
}
