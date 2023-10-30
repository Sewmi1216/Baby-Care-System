// import { Component } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../../../service/admin.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify-babysitters',
  templateUrl: './verify-babysitters.component.html',
  styleUrls: ['./verify-babysitters.component.css']
})
export class VerifyBabysittersComponent {
  babysitterProfile = {
    _id: '',
    userId: '',
    age: '',
    gender: '',
    image:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    religon: '',
    language: '',
  };
  babysitterFullName: string | null = null;

  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  babysitterId: string | null = null; // Initialize the babysitterId variable
  parentId:  string = ''

  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['id'];
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }


  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const userString = JSON.parse(userJSON); // Use the User interface
      console.log(userString);
      this.parentId = userString.id;
      console.log(this.parentId)
    }
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.adminService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          console.log(this.babysitterProfile)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          console.log(this.babysitterProfile);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }
}
