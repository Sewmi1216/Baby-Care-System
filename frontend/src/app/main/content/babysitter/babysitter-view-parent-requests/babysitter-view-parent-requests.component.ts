import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild} from '@angular/core';
import {BabysitterService} from "../../../../service/babysitter.service";
import { NgToastService } from 'ng-angular-popup';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-babysitter-view-parent-requests',
  templateUrl: './babysitter-view-parent-requests.component.html',
  styleUrls: ['./babysitter-view-parent-requests.component.css']
})
export class BabysitterViewParentRequestsComponent {

  babysitters: any[] = [];
  requestForms: any[] = [];
  isAccept: number | null = null;
  formattedDate: string = '';
  formattedDates: string[] = [];
  babysitterName: string | null = null;
  babysitterNames: string[] = []

  constructor(
    private babysitterService: BabysitterService, private toast: NgToastService, private router: Router, private CookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getRequestForms();
  }

  getRequestForms(){
    const userJSON = localStorage.getItem('user');
    console.log(userJSON)
    if(userJSON!==null){
      this.babysitterService.getRequestForms(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.requestForms = response.requestForms;
          console.log(this.requestForms)
          for (const requestForm of this.requestForms) {
            const date = new Date(requestForm.date);
            this.formattedDate=`${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
            this.formattedDates.push(this.formattedDate);
            this.isAccept = requestForm.isAccept;
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
