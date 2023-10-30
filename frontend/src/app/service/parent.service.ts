//parent service
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import { throwError } from 'rxjs';

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
      'Authorization': `${this.getAccessTokenFromCookie()}`
    });

    const userId = user.id;
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabies/${userId}`, { headers });
  }

  getTaskListTemplates(user:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('Request headers:', headers);
    //console.log(userId); // working
    return this.http.get<any>(`${environment.backend_url}/parent/getAllTaskListTemplates/${userId}`, {headers});
  }

  getAllOldTaskLists(user:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getAllOldTaskLists/${userId}`, {headers});
  }


  getTaskListTemplate(user:any, taskListId:string):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log(headers);
    const userId = user.id;
    console.log(userId);
    console.log(taskListId)
    console.log('Request headers:', headers);
    //console.log(userId); // working
    return this.http.get<any>(`${environment.backend_url}/parent/getTaskListTemplate/${taskListId}`, {headers});
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


  addTaskListForm(taskListForm:any, userString:any): Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestBody ={
      taskListForm:taskListForm,
      userID: userString.id,
    };
    console.log(requestBody);


    return this.http.post<any>( `${environment.backend_url}/parent/addTaskList`, JSON.stringify(requestBody), {headers});
  }

  addDateToTaskListTemplate(dataToSave:any,userString:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const requestBody ={
      taskListForm: dataToSave,
      userID: userString.id,
    };
    console.log(requestBody);
    return this.http.post<any>( `${environment.backend_url}/parent/addDateForTaskList`, JSON.stringify(requestBody), {headers});
  }


  deleteTaskListTemplate(user:any,taskListId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.delete<any>(`${environment.backend_url}/parent/deleteTaskListTemp/${taskListId}`, { headers });
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


  createTaskListTemplate(taskList: any): Observable<any> {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      // Send a POST request to save the new task list
      return this.http.post<any>(`${environment.backend_url}/parent/createTaskListTemplate`, taskList, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
        }
      });
    } else {
      // Return an Observable with an error message or handle this case accordingly
      return throwError('User JSON is null.'); // You can customize the error message here
    }
  }

  confirmBabysitter(user:any, babysitterId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.put<any>(`${environment.backend_url}/parent/updateParent/${babysitterId}/${userId}`, { headers });
  }

  getParent(user:any): Observable<any> {
    // const parentId = parentID
    // console.log(parentId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getOnlyParent/${userId}`);
  }

  getNoOfBabies(user:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabiesCount/${userId}`);
  }

  getNoOfRequests(user:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/getRequestsCount/${userId}`);
  }

  updateDates(updatebabysitter: any, babysitterId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log('Request headers:', headers);
    return this.http.put<any>(`${environment.backend_url}/parent/updateBabysitter/${babysitterId}`, JSON.stringify(updatebabysitter), { headers });
  }
}

