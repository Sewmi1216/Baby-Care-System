import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-baby-sitters',
  templateUrl: './view-baby-sitters.component.html',
  styleUrls: ['./view-baby-sitters.component.css']
})

export class ViewBabySittersComponent implements OnInit{
  babysitters: any[] = [];
  babysitter = {
    age: '',
    gender: '',
    image: '',
  };
  requestForms: any[] = [];
  babysitterId: any[] = [];

  parentId: string = ''

  private userId: any;

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router: Router, private CookieService: CookieService
  ){}

  ngOnInit(): void {
    this.getBabysitters();
  }

  getBabysitters(){
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentId = JSON.parse(userJSON).id
      console.log(this.parentId)
      this.parentService.getBabysitters(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.babysitters = response.babysitters;
          console.log("tharu",this.babysitters)
          this.getRequestForms();
        },
        (error)=>{
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
            this.babysitterId.push(requestForm.Babysitter)
          }
          console.log(this.babysitterId)
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching requestForms:', error);
        }
      )
    }
  }

  filteredBabysitters() {
    return this.babysitters.filter(babysitter => !babysitter.isHired && !this.babysitterId.includes(babysitter.userId));
  }
}
