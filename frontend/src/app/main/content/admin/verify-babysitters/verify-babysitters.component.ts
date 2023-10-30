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
    _id: '',
    // userId: '',
    role:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    status:'',




    // age: '',
    // gender: '',
    // image:'',
    // religon: '',
    // language: '',
  };
  babysitterFullName: string | null = null;

  currentInfoID = ''
  about: string ="";


  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  babysitterId: string | null = null; // Initialize the babysitterId variable
  parentId:  string = ''

  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute,private http:HttpClient
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['id'];
      console.log('hello');
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }


  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    console.log('hello');

    if (userJSON !== null) {
      const userString = JSON.parse(userJSON); // Use the User interface
      console.log(userString);
      this.parentId = userString.id;
      console.log(this.parentId)
      console.log('hellooo');

    }
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.adminService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          console.log('hiiiiko')

          console.log(this.babysitterProfile)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          console.log(this.babysitterProfile.firstName);
          console.log(this.babysitterFullName);


        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
    console.log('hello');

  }

  setUpdate(data:any){
    this.about = data.about;
    

    this.currentInfoID = data.id;

  }

  UpdateRecords(data:any){
    let BodyData = {
      "about":this.about,
      
    };

    this.http.put("http://localhost:8070/admin/updateSystemInfo"+"/"+this.currentInfoID,BodyData).subscribe((res: any)=>{
      console.log(res);
      alert("Info Updated")
    });

  }

  save(data:any){
    this.about = data.about;
    

    this.currentInfoID == data.id;
  }

}

interface sytemInfoArray{
id: string;
about: string;
goals: string;
service: string;
vision: string;
team: string;
thank: string;
}

