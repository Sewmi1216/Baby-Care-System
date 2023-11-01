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

  userProfile = {
    id: '',
    role:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    status:'',

  };
  userId: string | null = null;

  userFullName: string | null = null;
  
  
  details: any;
  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient,private route: ActivatedRoute ) {}

    ngOnInit(): void {
      
      //  this.getUserDetails();

      //  const userId = this.route.snapshot.paramMap.get('id');
      //  this.adminService.getUserDetails(userId).subscribe(data => {
      //    this.userArray = data;
      //  });
       this.route.params.subscribe(params => {
        this.userId = params['id'];
        // console.log('hello');
        console.log(this.userId);
        this.getUser();
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

  getUser(){

    const userJSON = localStorage.getItem('user');
    console.log(this.userId);
    console.log('hi')
    if(userJSON!==null){
      this.adminService.getUser(this.userId).subscribe(
        (response) => {
          this.userProfile = response.user;
          console.log(this.userProfile)
          this.userFullName = `${this.userProfile.firstName} ${this.userProfile.lastName}`;

          // this.img=response.imageUrl
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching user:', error);
        }
      )
    }}


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