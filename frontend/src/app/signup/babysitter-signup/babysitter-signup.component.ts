import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-babysitter-signup',
  templateUrl: './babysitter-signup.component.html',
  styleUrls: ['./babysitter-signup.component.css']
})
export class BabysitterSignupComponent implements OnInit{
  @ViewChild('userAccountForm', { static: true }) public userAccountForm!: NgForm;

  useraccount = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    nic: ''
  };

  constructor(
    private authService: AuthService,

  ) {}

  ngOnInit(): void {

  }



  onSubmit() {
    console.log("Submitting form...");
    this.authService.register(this.useraccount).subscribe(
      (data) => {
        console.log("Registration successful:", data);
        console.log("Successfully");
      },
      (err) => {
        console.log('Registration failed:', err);
        console.log('Unsuccess');
      }
    );
  }

}
