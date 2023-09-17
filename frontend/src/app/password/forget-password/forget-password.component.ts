import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
// @ts-ignore
import {AuthService } from '../service/auth.service';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  user = {email: ''}; // Initialize an object to hold form data

  constructor(private http: HttpClient, private authService: AuthService) {
  }


  onSubmit() {
    this.authService.forgetPassword(this.user).subscribe(() => {
      // Send a POST request to your Node.js backend to initiate the password reset process
      this.http.post('/forget_password', {email: this.user.email}).subscribe(
        (response: any) => {
          console.log(response.message);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
  }
}
