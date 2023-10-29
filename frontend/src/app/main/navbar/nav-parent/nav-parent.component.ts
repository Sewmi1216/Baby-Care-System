import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {any} from "@tensorflow/tfjs";

@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrls: ['./nav-parent.component.css']
})

export class NavParentComponent {

  parent = {
    babysitter: '',
    isFree:'',
    userId:null,
    _id:''
  }
  parentId: string = ''
type= {
    isFree:any
}
   isFree: any;
  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.getParent();
    this.getType();
  }

  getParent(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {

      this.parentService.getParent(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.parent = response.parent;
          console.log(this.parent);
          this.parentId = this.parent._id
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }
  getType(){

      const userJSON = localStorage.getItem('user');
      if (userJSON !== null) {
        this.parentService.getPlan(JSON.parse(userJSON)).subscribe(
          (response: any) => {
            this.type = response.type;
            this.isFree = response.isFree;
          },
          (error) => {
            console.error('Error fetching: ', error);
          }
        );
      }
    }

  }

