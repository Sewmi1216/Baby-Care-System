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
    email:'',
    newPassword: undefined,
    confirmPassword: undefined
  };

  userId: any;
  today = new Date();
  img:string=''
  parent: any;
  // newPassword: any;
 // confirmNewPassword: any;

  constructor(
    private route:ActivatedRoute,private parentService: ParentService, private toast: NgToastService, private router:Router,private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['user_id'];
      this.getParent();
    });
  }


  // updatePassword() {
  //   if (this.newPassword === this.confirmNewPassword) {
  //     // @ts-ignore
  //     const user = JSON.parse(localStorage.getItem('user'));
  //     if (user) {
  //       this.parentService.updatePassword(user).subscribe(
  //         (data:any) => {
  //           console.log("Password updated successfully:", data);
  //           this.toast.success({detail: "Password updated successfully", summary: 'Updated', position: 'topCenter'});
  //           console.log("Successfully");
  //           location.reload();
  //         },
  //         (err:any) => {
  //           this.toast.error({detail: "Error", summary: err.error.message, position: 'topCenter'});
  //           console.error(`Failed to update password: ${err}`, err);
  //         }
  //       );
  //     } else {
  //       console.error("User data not found in local storage.");
  //     }
  //   } else {
  //     console.error("Passwords do not match");
  //   }

  //
  // }

  // }


  getParent() {
    // @ts-ignore
    this.parentService.getParentProfile(this.userId).subscribe(
      (response) => {
        this.user = response.parent;
        console.log(response.parent);
        this.img=response.imageUrl
      },
      (error) => {
        console.error('Error fetching parent:', error);
      }
    );
  }


  gotoUpdate() {
    this.parentService.updateParent(this.user).subscribe(
      (response) => {
        // this.router.navigate(['/parent/parent_profile/:this.userId'])
        this.toast.success({detail:"SUCCESS",summary:'Parent updated successfully', position:'topCenter'});
        console.log("Parent updated successful:", response);

      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful parent update:${err}`, err);
      }
    );
  }
}