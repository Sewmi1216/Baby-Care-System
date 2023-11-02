// import { Component } from '@angular/core';
import { Component } from '@angular/core';

// import { Component, OnInit, ViewChild } from '@angular/core';
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
  sytemInfoArray : sytemInfoArray[]=[];

  babysitterProfile = {
    id: '',
    // userId: '',
    role:'',
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
  status: string ="active";
  status1:string="reject";
  // role: string ="";
  // firstName: string ="";
  // lastName: string ="";
  // nic: string ="";
  // phone: string ="";
  // address: string ="";
  // email: string ="";

  koko:string="";
  kokoId:string="";


  // @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

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
      // this.updateVerifyStatus();
    });
  }


  getBabysitter(){

    const userJSON = localStorage.getItem('user');
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.adminService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          this.sytemInfoArray = response.babysitter; 
          this.koko=response.babysitter.status;
          this.kokoId=response.babysitter._id;

          console.log(this.babysitterProfile)
          console.log(this.sytemInfoArray)
          console.log(this.koko);
          console.log('hello machn')
          console.log(this.kokoId)
          console.log('hello machn')



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
  // updateVerifyStatus(){

  //   console.log('hello')

  //   const userJSON = localStorage.getItem('user');
  //   console.log(this.babysitterId);
  //   if(userJSON!==null){
  //     this.adminService.updateVerifyStatus(this.babysitterId).subscribe(
  //       (response) => {
  //         this.babysitterProfile = response.babysitter;
  //         console.log('amma')
  //         console.log(this.babysitterProfile)

  //         // this.img=response.imageUrl
  //       },
  //       (error)=>{
  //         console.log(localStorage.getItem('user'))
  //         console.error('Error fetching babysitters:', error);
  //       }
  //     )
  //   }
 

  // }

  UpdateVerifyRecords(){
    console.log("hi hui")
    let BodyData = {
    //   "role":this.role,
    // "firstName": this.firstName,
    // "lastName": this. lastName,
    // "email": this.email,
    // "phone": this.phone,
    // "address": this.address,
    // "nic": this.nic,
    "status":this.status,
    };

    
    this.http.put("http://localhost:8070/admin/updateVerifyStatus"+"/"+this.currentInfoID,BodyData).subscribe((res: any)=>{
      console.log(res);
      // this.status=response.info;
      alert("Babysitter Verified")
    });


  }

  UpdateRejectRecords(){
    console.log("hi hui")
    let BodyData = {
    //   "role":this.role,
    // "firstName": this.firstName,
    // "lastName": this. lastName,
    // "email": this.email,
    // "phone": this.phone,
    // "address": this.address,
    // "nic": this.nic,
    "status":this.status1,
    };

    
    this.http.put("http://localhost:8070/admin/updateVerifyStatus"+"/"+this.currentInfoID,BodyData).subscribe((res: any)=>{
      console.log(res);
      // this.status=response.info;
      alert("Babysitter Rejected")
    });


  }

  save(){
    
    this.currentInfoID = this.kokoId;
    console.log("hello hui")
    console.log(this.currentInfoID);

    this.UpdateVerifyRecords();

  }
  saveReject(){
    this.currentInfoID = this.kokoId;
    console.log("hello hui")
    console.log(this.currentInfoID);

    this.UpdateRejectRecords();
  }

  // setUpdate(data:any){
  //   this.status = data.koko;

    
  //   this.currentInfoID = data.response.babysitter._id
  //   console.log('hello')
  //   console.log(this.currentInfoID)

  // }

}

interface sytemInfoArray{
  _id: string;
  firstName: string;
  lastName: string; 
  email: string;
  phone: string;
  address: string;
  nic: string;
  status: string;
 
  }

