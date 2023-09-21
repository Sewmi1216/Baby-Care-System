
import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AdminService } from "../../../../service/admin.service";
// import { AdminService } from "/Users/rusithdhyan/Documents/Project/Baby-Care-System/frontend/src/app/service/admin.service";

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-add-moderator',
  templateUrl: './add-moderator.component.html',
  styleUrls: ['./add-moderator.component.css']
})
 
export class AddModeratorComponent implements OnInit{
  
  expertArray : expertArray[]=[];


  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient
  ) {}

    ngOnInit(): void {
      // this.userId = this.parentService.getUserId();
      // this.babyProfile = this.parentService.babyProfile;
       this.getExperts();
      //  this.getAllExpert();
     }
    
     getExperts() {
      // @ts-ignore
      this.adminService.getExperts(JSON.parse(localStorage.getItem('user'))).subscribe(
        (response) => {
          this.expertArray = response.expert; 
          console.log(this.expertArray);
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          // console.error('Error fetching babies:', error);
        }
      );
    }
    
    currentExpertID = "";
    ExpertItem='';

    id: string ="";
    firstName: string ="";
    lastName: string ="";
    nic: string ="";
    address: string ="";
    phone: string ="";
    email: string ="";
    password: string ="";

    
   
   

    register(){
      let bodyData ={
        // "id":'',
        "firstName" : this.firstName,  
        "lastName" :  this.lastName,
        "nic" :  this.nic,
        "address" :  this.address,
        "phone" :  this.phone,
        "email" :  this.email,
        "password" : this.password,
      };

      
      this.http.post("http://localhost:8070/admin/addDomainexpert",bodyData).subscribe((resultData: any)=>
      {
        console.log(resultData);
        alert("Expert registered succecfully")

        this.firstName = "";
        this.lastName = "";
        this.nic = "";
        this.address = "";
        this.phone = "";
        this.email = "";
        this.password = "";

      });
    }

    getAllExpert(){
      this.http.get("http://localhost:8070/admin/getAllExperts")
      .subscribe((resultData: any)=>
      {
        // this.isResultLoaded = true;
        console.log(resultData);
        this.expertArray = resultData.data;
        
      });
    }

    


}

interface expertArray{
  // id: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  phone: string;
  email: string;
  password: string;}
