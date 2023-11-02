import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router';
import { AdminService } from "../../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-handle-complaints-view-more',
  templateUrl: './handle-complaints-view-more.component.html',
  styleUrls: ['./handle-complaints-view-more.component.css']
})
export class HandleComplaintsViewMoreComponent {


  complaintProfile = {
    id: '',
    type: '',
    description: '',
    status:'',
    date: '',


  };
  complaintId: string | null = null;



  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient,private route: ActivatedRoute
  ) {}

    ngOnInit(): void {

      this.route.params.subscribe(params => {
        this.complaintId = params['id'];
        // console.log('hello');
        console.log(this.complaintId);
        this.getcomplaint();
      });
      
     }


     getcomplaint(){

      const userJSON = localStorage.getItem('user');
      console.log(this.complaintId);
      if(userJSON!==null){
        this.adminService.getOneComplaint(this.complaintId).subscribe(
          (response) => {
            this.complaintProfile = response.complaint;
  
            console.log(this.complaintProfile)  
  
  
            // this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
  
            // this.img=response.imageUrl
          },
          (error)=>{
            console.log(localStorage.getItem('user'))
            console.error('Error fetching complaint:', error);
          }
        )
      }
   
  
    }























  isSolved = false;

  showSolvedDetails() {
    // Implement logic to fetch admin details
    // For demonstration, we're just setting isSolved to true
    this.isSolved = true;
  }


}
