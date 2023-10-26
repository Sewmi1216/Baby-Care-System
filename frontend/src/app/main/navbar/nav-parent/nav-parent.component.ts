// import { Component } from '@angular/core';
//
// @Component({
//   selector: 'app-nav-parent',
//   templateUrl: './nav-parent.component.html',
//   styleUrls: ['./nav-parent.component.css']
// })
// export class NavParentComponent {
//
// }

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-nav-parent',
  templateUrl: './nav-parent.component.html',
  styleUrls: ['./nav-parent.component.css']
})

export class NavParentComponent {
  private _isFree: boolean = false; // Initialize with a default value


  get isFree(): boolean {
    return this._isFree;
  }

  set isFree(value: boolean) {
    this._isFree = value;}
  parent = {
    babysitter: '',
    isFree:'',
    userId:null,
    _id:''
  }
  parentId: string = ''

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.getParent();
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
}
