import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {AuthService} from "../../../service/auth.service";
import {log} from "@tensorflow/tfjs";

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
  user =  {
    firstName: '',
    lastName: '',
    role: '',
    _id:''
  }
  profile:string=''
  parentId: string = ''

  constructor(
    private parentService: ParentService, private authService:AuthService,private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // this.getParent();
    this.getImg()
  }
  getImg() {
    const userJSON = localStorage.getItem('user');

    if (userJSON !== null) {
      this.authService.getImg(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response.imageUrl)
          this.profile=response.imageUrl
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
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
