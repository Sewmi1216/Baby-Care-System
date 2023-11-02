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

  //in requestForm
  requestForms: any[] = [];
  formattedDate: string = '';
  isAccept: string = '';
  formattedDates: string[] = [];
  requestedParentId: string = '';
  requestFormId: string = ''
  requestFormsId: string[] = []

  //in parents
  parents: any [] =[]
  parentName: string = ''
  parentNames: string[] = []
  parentEmail: string = ''
  parentEmails: string[] = []
  requestedParentsId: string[] = []
  imageUrl: string = ''
  imageUrls: string[] = []

  constructor(
    private babysitterService: BabysitterService, private toast: NgToastService, private router: Router, private CookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.getRequestForms();
    this.getParents();
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
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const formattedDate = `${year}.${month}.${day}`;
            this.formattedDates.push(formattedDate);

            this.isAccept = requestForm.isAccept;
            this.requestedParentId = requestForm.parent;
            this.requestFormId = requestForm._id;
            this.requestedParentsId.push(this.requestedParentId);  
            this.requestFormsId.push(this.requestFormId)
          }
          console.log(this.requestFormsId);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForms:', error);
        }
      )
    }
  }

  getParents(){
    const userJSON = localStorage.getItem('user');
    console.log(userJSON)
    if(userJSON!==null){
      this.babysitterService.getParents(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.parents = response.parents;
          console.log(this.parents)
          for (const parent of this.parents){
            const firstName = parent.firstName
            const lastName = parent.lastName;
            this.imageUrl = parent.profile;
            // console.log(this.imageUrl)
            // this.imageUrls.push(this.imageUrl)

            this.parentName = `${firstName} ${lastName}`;

            this.parentEmail = parent.email;
          
              // Check if the babysitter userId matches any requestFormBabysittersId
            const matchingIndex = this.requestedParentsId.indexOf(parent.userId);

            if (matchingIndex !== -1) {
              // If there's a match, assign the name to the corresponding index in babysitterNames
              this.parentNames[matchingIndex] = this.parentName;
              this.parentEmails[matchingIndex] = this.parentEmail;
              this.imageUrls[matchingIndex] = this.imageUrl;
            }
          }
          console.log(this.imageUrls)
          console.log(this.parentNames)
          console.log(this.parentEmails)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForms:', error);
        }        
      )
    }
  }
}
