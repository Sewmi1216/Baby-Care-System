// @ts-ignore
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  user = {email: ''}; // Initialize an object to hold form data
  constructor(private http: HttpClient) {
  }

  onSubmit() {
    // Send a POST request to your Node.js backend to initiate the password reset process
    this.http.post('/api/forgot-password', {email: this.user.email}).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
