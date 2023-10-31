// import { Component } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../../service/admin.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-verify-babysitters',
  templateUrl: './verify-babysitters.component.html',
  styleUrls: ['./verify-babysitters.component.css']
})
export class VerifyBabysittersComponent {
  babysitterProfile = {
    id: '',
    // userId: '',
    // role:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    status:'',

  };
  babysitterId: string | null = null;

  babysitterFullName: string | null = null;

  currentInfoID = ''
  status: string ="";


  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  // babysitterId: string | null = null; // Initialize the babysitterId variable
  parentId:  string = ''

  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute,private http:HttpClient
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['id'];
      // console.log('hello');
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }


  getBabysitter(){

    const userJSON = localStorage.getItem('user');
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.adminService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          console.log(this.babysitterProfile)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;

          // this.img=response.imageUrl
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
 

  }

  UpdateVerifyRecords(data:any){
    console.log("hi hui")
    let BodyData = {
      "status": "active",
    };

    this.http.put("http://localhost:8070/admin/updateVerifyStatus"+"/"+this.babysitterId,BodyData).subscribe((res: any)=>{
      console.log(res);
      // this.status=response.info;
      // alert("Info Updated")
    });

  }

  save(data:any){
    
    this.currentInfoID == data._id;

    this.UpdateVerifyRecords(data)

  }

}

// interface sytemInfoArray{
// _id: string;
// status: string;

// }

