import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  tasklist: any;
  constructor(private http: HttpClient) { }
  addTaskList(tasklist:any): Observable<any>{
    return this.http.post<any>(environment.backend_url + "/parent/addTaskList", tasklist)
  }
}
