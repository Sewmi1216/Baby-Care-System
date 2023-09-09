import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BabysitterService } from '../../../../../service/babysitter.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-babysitter-view-more-parent-requests',
  templateUrl: './babysitter-view-more-parent-requests.component.html',
  styleUrls: ['./babysitter-view-more-parent-requests.component.css']
})
export class BabysitterViewMoreParentRequestsComponent {

  requestFormId: string = '';
  parentName: string = '';

  requestForm = {
    Babysitter: '',
    babyDetails: [{
      age: null,
      gender: ''
    }],
    isAccept: null,
    parent: '',
    date: '',
    specialNeeds: '',
    workExpectation: [{
      date: '',
      fromTime: '',
      toTime: '',
    }],
  }

  formattedDate: string = ''
  workDays: string[] = []
  fromTimes: string[] = []
  toTimes: string[] = []
  ages: any[] = []
  genders: string[] = []
  specialNeeds: string = ''

  constructor(
    private babysitterService: BabysitterService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.requestFormId = params['requestForm_id'];
      this.parentName = params['parentName'];
      console.log(this.requestFormId);
      console.log(this.parentName)
      console.log(this.requestForm)
    });
    this.getRequestForm();
  }

  getRequestForm(){
    const userJSON = localStorage.getItem('user');
    console.log(userJSON)
    console.log(this.requestFormId)
    if(userJSON!==null){
      this.babysitterService.getRequestForm(JSON.parse(userJSON), this.requestFormId).subscribe(
        (response) => {
          this.requestForm = response.requestForm;
          console.log(this.requestForm)
          const date = new Date(this.requestForm.date);
          this.formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
          console.log(this.formattedDate);
          for (const workExpectation of this.requestForm.workExpectation) {
            this.workDays.push(workExpectation.date)
            this.fromTimes.push(workExpectation.fromTime)
            this.toTimes.push(workExpectation.toTime)
          }
          // console.log(this.workDays);
          // console.log(this.fromTimes)
          // console.log(this.toTimes)
          for(const babyDetails of this.requestForm.babyDetails){
            this.ages.push(babyDetails.age);
            this.genders.push(babyDetails.gender)
          }
          // console.log(this.ages)
          // console.log(this.genders)
          this.specialNeeds = this.requestForm.specialNeeds;
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForm:', error);
        }
      )
    }
  }

  acceptrequest(){
    const userJSON = localStorage.getItem('user');
    console.log(userJSON)
    if(userJSON!==null){
      this.babysitterService.updateRequestForm(JSON.parse(userJSON), this.requestFormId).subscribe(
        (response) => {
          console.log(response);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForm:', error);
        }
      )
    }
  }
  rejectRequest(){

  }

}
