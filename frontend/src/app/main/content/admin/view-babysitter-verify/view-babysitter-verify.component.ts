import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from "../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-babysitter-verify',
  templateUrl: './view-babysitter-verify.component.html',
  styleUrls: ['./view-babysitter-verify.component.css']
})


export class ViewBabysitterVerifyComponent {
  userArray : userArray[]=[];

  details: any;
  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient,private route: ActivatedRoute ) {}

    ngOnInit(): void {
      
      //  this.getUserDetails();

       const userId = this.route.snapshot.paramMap.get('id');
       this.adminService.getUserDetails(userId).subscribe(data => {
         this.userArray = data;
       });
     }
  showReasonInput: boolean = false;
  deactivationReason: string = '';

  deactivateUser() {
    this.showReasonInput = true;
  }

  submitDeactivation() {
    if (this.deactivationReason.trim() !== '') {
      // Here you can perform the deactivation process and submit the reason
      console.log("User deactivated with reason:", this.deactivationReason);
      // Reset values
      this.showReasonInput = false;
      this.deactivationReason = '';
    }
  }
  // ... (component properties and methods)


//   getUserDetails() {
//     // @ts-ignore
//     this.adminService.getDetail(response.id).subscribe((data: any) => {
//       this.details = data;
  
//   })


// }


  user: any;

}


interface userArray{
  _id: string;
  firstName: string;
  lastName: string;
  nic: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  role:string;}