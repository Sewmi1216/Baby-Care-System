import { babysitterGuard } from './../../../../guard/babysitter.guard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-parent-dashboard',
  templateUrl: './parent-dashboard.component.html',
  styleUrls: ['./parent-dashboard.component.css']
})
export class ParentDashboardComponent {

  parentId: string = ''
  babysitterId: string = ''
  parent = {
    babysitter: '',
    isFree:'',
    userId:null,
    _id:''
  }
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
  }
  babyCount: string = ''
  requestCount: string = ''

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.getParent();
  }

//Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }

  getParent(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {

      this.parentService.getParent(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.parent = response.parent;
          console.log(this.parent);

          this.babysitterId = this.parent.babysitter;
          console.log(this.babysitterId)
          if(this.babysitterId){
            this.getBabysitter();
          }
          else{
            this.getNoOfBabies();
          }
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response)=>{
          this.babysitterProfile = response.babysitter
          console.log(this.babysitterProfile._id)
          this.getNoOfBabies();
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getNoOfBabies(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getNoOfBabies(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.babyCount = response.count
          console.log(this.babyCount)
          this.getNoOfRequests();
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }    
  }

  getNoOfRequests(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getNoOfRequests(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.requestCount = response.count
          console.log(this.requestCount)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }    
  }
}
