import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from "../../../../service/admin.service";
import { babysitterGuard } from './../../../../guard/babysitter.guard';
// import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  parentCount:String = ''
  babysitterCount:String = ''
  userCount:String = ''
  complaintCount:String = ''

  


  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.getNoOfParent();
    this.getNoOfBabysitter();
    this.getNoOfUsers();
    this.getNoOfComplaint();

  }


  getNoOfParent(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.adminService.getNoOfParent(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.parentCount = response.count
          console.log(this.parentCount)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }    
  }
  getNoOfBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.adminService.getNoOfBabysitter(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.babysitterCount = response.count
          console.log(this.babysitterCount)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }    
  }
  getNoOfComplaint(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.adminService.getNoOfComplaint(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.complaintCount = response.count
          console.log(this.complaintCount)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching complaint:', error);
        }
      )
    }    
  }
  getNoOfUsers(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.adminService.getNoOfUsers(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.userCount = response.count
          console.log(this.userCount)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }    
  }
  // dataCount: number;

  // constructor(private adminService: AdminService) { }

  // ngOnInit(): void {
  //   this.dataService.getDataCount().subscribe(
  //     (response) => {
  //       this.dataCount = response.count;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}

