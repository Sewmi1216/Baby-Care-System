import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from "../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pending-babysitter-list',
  templateUrl: './pending-babysitter-list.component.html',
  styleUrls: ['./pending-babysitter-list.component.css']
})
export class PendingBabysitterListComponent {

  sitterArray : sitterArray[]=[];



  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient
  ) {}

    ngOnInit(): void {
      
       this.getBabysitters();
     }
    
     getBabysitters() {
      // @ts-ignore
      this.adminService.getBabysitters(JSON.parse(localStorage.getItem('user'))).subscribe(
        (response) => {
          this.sitterArray = response.user; 
          // this.sitterArray = response.filter(=> user.role === 'babysitter');

          console.log(this.sitterArray);
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          // console.error('Error fetching babies:', error);
        }
      );
    }

}

interface sitterArray{
  // id: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  role:string;}

  
