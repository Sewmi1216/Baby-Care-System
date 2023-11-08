import { parentGuard } from './../../../../guard/parent.guard';
import { babysitterGuard } from './../../../../guard/babysitter.guard';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BabysitterService } from '../../../../service/babysitter.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-babysitter-admin-dashboard',
  templateUrl: './babysitter-dashboard.component.html',
  styleUrls: ['./babysitter-dashboard.component.css']
})
export class BabysitterDashboardComponent {

  userId: string = '';
  parentId: string = ''
  parent = {
    profile: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    nic: '',
  }
  profile: string = ''
  parentName: string = ''
  constructor(
    private babysitterService: BabysitterService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.getParent();
  }

  getParent(){
    const userJSON = localStorage.getItem('user');
    if(userJSON !== null){
      const userString = JSON.parse(userJSON);
      this.userId = userString.id;
      console.log(this.userId)
      this.babysitterService.getParent(this.userId).subscribe(
        (data) => {
          console.log(data)
          this.parentId = data.babysitter.parent;
          console.log(this.parentId)
          this.getParentDetail(this.parentId)
          // console.log("Registration successful:", data);
          // this.toast.success({detail:"SUCCESS",summary:'Request form added successfully', position:'topCenter'});
          // console.log("Successfully");
          // this.router.navigate([`parent/requested_babysitters/${this.parentId}`]);
        },
        (err) => {
         // this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
  }

  getParentDetail(parentId:string){
    this.babysitterService.getParentDetails(parentId).subscribe(
      (data) => {
        this.parent = data.parent
        this.parentName = this.parent.firstName + " " + this.parent.lastName
        this.profile = this.parent.profile
        console.log(this.parent)
        // console.log("Registration successful:", data);
        // this.toast.success({detail:"SUCCESS",summary:'Request form added successfully', position:'topCenter'});
        // console.log("Successfully");
        // this.router.navigate([`parent/requested_babysitters/${this.parentId}`]);
      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful requestForm:${err}`, err);
      }
    )
  }
}
