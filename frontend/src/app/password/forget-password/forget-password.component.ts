import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";





@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  user = {email: ''}; // Initialize an object to hold form data

  constructor(private authService: AuthService, private router: Router,private toast: NgToastService) {
  }


  onSubmit() {
    this.authService.forgetPassword(this.user).subscribe((user) => {
      // Send a POST request to your Node.js backend to initiate the password reset process
      if (user['message'] == "sent") {
        this.toast.success({detail: "SUCCESS", summary: user.message, position: 'topCenter'});
      } else {
        this.toast.success({detail: "ERROR", summary: user.message, position:'topCenter'});
      }


    });
  }
}
