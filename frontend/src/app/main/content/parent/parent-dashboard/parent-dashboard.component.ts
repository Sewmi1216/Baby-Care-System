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
  babies: any[] =[]
  parentUserId: string = ''

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.route.params.subscribe(params => {
      const parentUserId = params['userId'];
      console.log('User ID:', parentUserId);
    });
  }

//Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;
  }

  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response)=>{
          this.babysitterProfile = response.babysitter
          console.log(this.babysitterProfile._id)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getBabies(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBabies(JSON.parse(userJSON)).subscribe(
        (response)=>{
          this.babies = response.babies
          console.log(this.babies)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }
}
