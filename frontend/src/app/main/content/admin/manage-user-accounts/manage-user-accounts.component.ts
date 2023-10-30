import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from "../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-manage-user-accounts',
  templateUrl: './manage-user-accounts.component.html',
  styleUrls: ['./manage-user-accounts.component.css']
})
export class ManageUserAccountsComponent {

  userArray : userArray[]=[];

  user: any;
  


  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient
  ) {}

    ngOnInit(): void {
      
       this.getUsers();
       
     }
    
     getUsers() {
      // @ts-ignore
      this.adminService.getAllUsers(JSON.parse(localStorage.getItem('user'))).subscribe(
        (response) => {
          this.userArray = response.user; 
          console.log(this.userArray);
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          // console.error('Error fetching babies:', error);
        }
      );
    }

    currentUserID = "";
    


  items: any[] = [
    { name: 'Sewmi Thimaya', email: 'sewmithimaya@gmail.com', status: 'Active' },
    // ... Add more items ...
  ];

  filterActiveStatus = false;
  filteredItems: any[] = [];

  toggleFilter() {
    this.filterActiveStatus = !this.filterActiveStatus;
    this.updateFilteredItems();
  }

  updateFilteredItems() {
    if (this.filterActiveStatus) {
      this.filteredItems = this.items.filter(item => item.status === 'Active');
    } else {
      this.filteredItems = this.items;
    }
  }

  goToUserDetails(user:any) {
    this.router.navigate(['/view-babysitter-verify.component', user._id]);
  }

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
  role:string;
  status:string}









  