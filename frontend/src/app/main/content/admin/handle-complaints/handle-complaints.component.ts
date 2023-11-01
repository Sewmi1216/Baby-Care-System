import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from "../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-handle-complaints',
  templateUrl: './handle-complaints.component.html',
  styleUrls: ['./handle-complaints.component.css']
})
export class HandleComplaintsComponent implements OnInit {

  complintArray: complaintArray[]=[];
  complaintProfile = {
    id: '',
    type: '',
    description: '',
    status:'',
    date: '',


  };
  complaintId: string | null = null;



  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient
  ) {}

    ngOnInit(): void {
      
       this.getComplaint();
     }
    
     getComplaint() {
      // @ts-ignore
      this.adminService.getComplaints(JSON.parse(localStorage.getItem('user'))).subscribe(
        (response) => {
          this.complintArray = response.complaint; 
          // this.sitterArray = response.filter(=> user.role === 'babysitter');

          console.log(this.complintArray);
        },
        (error) => {
          console.log(localStorage.getItem('user'))
        }
      );
    }

    



  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }


  isSolved = false;

  toggleStatus() {
    this.isSolved = !this.isSolved;
  }

}

interface complaintArray{
  _id: string;
  type: string;
  description: string;
  status: string;
  date: string;
  }
