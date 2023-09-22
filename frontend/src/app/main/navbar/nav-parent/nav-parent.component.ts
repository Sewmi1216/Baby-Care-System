import { babysitterGuard } from './../../../guard/babysitter.guard';
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

  parent = {
    babysitter: '',
    isFree:'',
    userId:null,
    _id:''
  }
  babysitterId: string = ''

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    this.getParent();
  }

  getParent(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {

      this.parentService.getParent(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.parent = response.parent;
          console.log(this.parent.userId);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching parent:', error);
        }
      )
    }
}
}
