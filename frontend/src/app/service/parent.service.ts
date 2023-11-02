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
  addBaby(baby: any): Observable<any> {
    return this.http.post<any>(environment.backend_url + "/parent/addBaby", baby)
  }

  // addBaby(baby: any, userID: any): Observable<any> {
  //   const requestBody = {
  //     baby: baby,
  //     userID: userID
  //   };
  //
  //   return this.http.post<any>(environment.backend_url + "/parent/addBaby", requestBody);
  // }

  // @ts-ignore
  getBabies(user): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
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
    return this.http.get<any>(`${environment.backend_url}/parent/getBabysitters/${babysitterId}`, { headers });
  }

  getRequestForms(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getRequestForms/${userId}`, { headers });
  }

  deleteRequestForm(user:any, requestFormId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.delete<any>(`${environment.backend_url}/parent/deleteRequestForm/${requestFormId}`, { headers });
  }


  confirmBabysitter(user:any, babysitterId: string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
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
  getParentProfile(user:any): Observable<any> {
    // const parentId = parentID
    // console.log(parentId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user;
    console.log("hi",userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getParentProfile/${userId}`,{headers});
  }
  updateParent(user:any): Observable<any> {
    // const parentId = parentID
    // console.log(parentId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user._id;
    return this.http.put<any>(`${environment.backend_url}/parent/updateParentProfile/${userId}`, user);
  }
  updatePlan(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user;
    console.log("mnk",userId)
    return this.http.put<any>(`${environment.backend_url}/parent/updatePlan/${userId}`, user);
  }
  updateToPremium(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user;
    console.log("mnk",userId)
    return this.http.put<any>(`${environment.backend_url}/parent/updateToPremium/${userId}`, user);
  }


  getParameters(ageGroupId:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log(ageGroupId);
    return this.http.get<any>(`${environment.backend_url}/parent/getParameters/${ageGroupId}`, { headers });
  }

  getVaccineList(user:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getVaccineList`, { headers });
  }

  getNoOfBabies(user:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getBabiesCount/${userId}`);
  }


  getBaby(babyID: any): Observable<any> {
    const babyId = babyID
    console.log(babyId)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    // const userId = user.id;
    // console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getBaby/${babyId}`, { headers });
  }

  getNoOfRequests(user:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getRequestsCount/${userId}`);
  }

  updateDates(updatebabysitter: any, babysitterId: any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    return this.http.put<any>(`${environment.backend_url}/parent/updateBabysitter/${babysitterId}`, JSON.stringify(updatebabysitter), { headers });
  }

  getAgeGroups(user:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log(userId);
    return this.http.get<any>(`${environment.backend_url}/parent/getAgeGroup`, { headers });
  }
  deleteBabysitter(babysitterId: any, parentId: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log('Request headers:', headers);
    return this.http.delete<any>(`${environment.backend_url}/parent/deleteBabysitter/${babysitterId}/${parentId}`);
  }

  deleteRequestFormID(babysitterId:any, parentId: any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    console.log('Request headers:', headers);
    return this.http.get<any>(`${environment.backend_url}/parent/deleteRequestFormID/${babysitterId}/${parentId}`);
  }

  updatePassword(user: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId =user.id;
    console.log('Request headers:', headers);
    return this.http.put<any>(`${environment.backend_url}/parent/updatePassword/${(userId)}`, JSON.stringify(this.updatePassword), {headers});
  }

  getPlan(user: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('userid:', userId)
    return this.http.get<any>(`${environment.backend_url}/parent/getPlan/${userId}`);
  }

  getType(user: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });
    const userId = user.id;
    console.log('userid:', userId)
    return this.http.get<any>(`${environment.backend_url}/parent/getType/${userId}`);
  }


  makePayment(stripeToken: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getAccessTokenFromCookie()}`
    });

    // Assuming you have a 'userId' variable defined in your class
    const userId = this.userId; // Replace with the correct way to get the user ID

    return this.http.put<any>(`${environment.backend_url}/parent/invokeStripe/${userId}`, {token: stripeToken}, {headers});
  }

  addComplaint(formdata:any) {
    return this.http.post<any>(environment.backend_url + "/parent/addComplaint", formdata)

  }
  //complaints
  // addComplaint(formdata: FormData) {
  //   let complaint;
  //   return this.http.post<any>(environment.backend_url + "/parent/addComplaint", complaint)
  //
  // }


}

