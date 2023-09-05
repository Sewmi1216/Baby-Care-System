import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentService } from "../../../../service/parent.service";
import { NgToastService } from 'ng-angular-popup';
import { Router, ActivatedRoute } from '@angular/router';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';

@Component({
  selector: 'app-requested-babysitters',
  templateUrl: './requested-babysitters.component.html',
  styleUrls: ['./requested-babysitters.component.css']
})
export class RequestedBabysittersComponent {
  babysitters: any[] = [];
  requestForms: any[] = [];

  //In the requestForms
  isAccept: number | null = null;
  isAccepts: number[] = [];
  formattedDate: string = '';
  formattedDates: string[] = [];
  requestFormBabysitterId: string = ''

  //in the babysitters
  babysitterName: string = ''
  babysitterNames: string[] = []
  requestFormBabysittersId: string[] = []

  // requestedbabysitterId: any[] = [];
  // babysittersId: any[] = []
  // requestedBabysitterNames: any[] = []
  // babysitterName: string | null = null;
  // babysitterNames: string[] = []
  // babysitterId: string | null = null

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router: Router, private CookieService: CookieService, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getRequestForms();
    this.getBabysitters();
  }

  getBabysitters() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBabysitters(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.babysitters = response.babysitters; // get all babysitters
          console.log(this.babysitters)
          for (const babysitter of this.babysitters){
            const firstName = babysitter.firstName
            const lastName = babysitter.lastName;
            this.babysitterName = `${firstName} ${lastName}`;
          
              // Check if the babysitter userId matches any requestFormBabysittersId
            const matchingIndex = this.requestFormBabysittersId.indexOf(babysitter.userId);

            if (matchingIndex !== -1) {
              // If there's a match, assign the name to the corresponding index in babysitterNames
              this.babysitterNames[matchingIndex] = this.babysitterName;
            }
          }
          console.log(this.babysitterNames)
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getRequestForms() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getRequestForms(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.requestForms = response.requestForms; // get all requestForms
          console.log(this.requestForms)

          for (const requestForm of this.requestForms){
            const date = new Date(requestForm.date);
            this.formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
            this.formattedDates.push(this.formattedDate); // get dates of the request forms

            this.isAccept = requestForm.isAccept;
            if (this.isAccept !== null) {
              this.isAccepts.push(this.isAccept);
            }
            this.requestFormBabysitterId = requestForm.Babysitter;
            this.requestFormBabysittersId.push(this.requestFormBabysitterId);  

          }
          console.log(this.requestFormBabysittersId)
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForms:', error);
        }
      )
    }
  }


}
