import { Component } from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css']
})
export class ParentProfileComponent {

  user = {
    id:'',
    firstName: '',
    lastName: '',
    gender:'',
    birthDate:'',
    profile:'',
    phone:'',
    address:'',
    email:''
  };

  userId: any;
  today = new Date();
  img:string=''
  parent: any;

  constructor(
    private route:ActivatedRoute,private parentService: ParentService, private toast: NgToastService, private router:Router,private cookieService: CookieService
  ) {}

  // const accessToken = this.cookieService.get('access_token');
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['user_id'];
      this.getParent();
    });
  }

  getParent() {
    // @ts-ignore
    this.parentService.getParent(this.userId).subscribe(
      (response) => {
        this.user = response.parent; // Assign fetched data to the babies array
        console.log(response.parent);
        this.img=response.imageUrl
      },
      (error) => {
        console.error('Error fetching parent:', error);
      }
    );
  }


}
