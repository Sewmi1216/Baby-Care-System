import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import { NgToastService } from 'ng-angular-popup';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-requested-babysitters',
  templateUrl: './requested-babysitters.component.html',
  styleUrls: ['./requested-babysitters.component.css']
})
export class RequestedBabysittersComponent {

  babysitters: any[] = [];
  requestForms: any[] = [];
  isAccept: number | null = null;
  formattedDate: string = '';
  formattedDates: string[] = [];
  babysitterName: string | null = null;
  babysitterNames: string[] = []
  babysitterId: string | null = null
  reqbabysitterId: string | null = null
  requestedBabysitters: string[] =[]

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router: Router, private CookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getBabysitters();
    this.getRequestForms();
  }

  getBabysitters(){
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentService.getBabysitters(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.babysitters = response.babysitters;
          this.babysitterNames = [];
          console.log(this.babysitters)
          for (const babysitter of this.babysitters) {
            const firstName = babysitter.firstName
            this.babysitterId = babysitter.userId
            const lastName = babysitter.lastName;
            this.babysitterName = `${firstName} ${lastName}`;
            this.babysitterNames.push(this.babysitterName);
            console.log('Name:', this.babysitterNames);
          }
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getRequestForms(){
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentService.getRequestForms(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.requestForms = response.requestForms;
          console.log(this.requestForms)
          for (const requestForm of this.requestForms) {
            const date = new Date(requestForm.date);
            this.formattedDate=`${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
            this.formattedDates.push(this.formattedDate);
            this.isAccept = requestForm.isAccept;
            this.reqbabysitterId = requestForm.Babysitter;
            console.log(this.reqbabysitterId)
            // console.log('Date:', this.formattedDate);
            // console.log('isAccept:', this.isAccept);
            // You can perform any operations you need with the date and isAccept here
          }
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForms:', error);
        }
      )
    }
  }
}
