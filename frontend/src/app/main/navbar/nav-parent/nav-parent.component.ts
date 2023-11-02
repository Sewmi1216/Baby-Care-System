import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ParentService} from '../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
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
    isFree: '',
    userId: null,
    _id: ''
  }
  user = {
    firstName: '',
    lastName: '',
    role: '',
    _id: ''
  }
  profile: string = ''
  parentId: string = ''
  type = {
    isFree: '',
  }
  isFree: any;
  myplan:any;

  constructor(
    private parentService: ParentService, private authService: AuthService, private toast: NgToastService, private router: Router, private cookieService: CookieService, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Get the babysitter_id parameter from the route
    this.getParent();
    this.getType();
    // this.getParent();
    this.getImg();
    this.getPlan();
  }

  getImg() {
    const userJSON = localStorage.getItem('user');

    if (userJSON !== null) {
      this.authService.getImg(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response.imageUrl)
          this.profile = response.imageUrl
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }
  getPlan() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getPlan(JSON.parse(userJSON)).subscribe(
        (response: any) => {
          this.myplan = response.plan.plan;
          console.log(response.plan.plan)
        },
        (error) => {
          console.error('Error fetching: ', error);
        }
      );
    }
  }
  getParent() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {

      this.parentService.getParentProfile(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.parent = response.parent;
          console.log(this.parent);
          // this.parentId = this.parent._id
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  getType() {

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

