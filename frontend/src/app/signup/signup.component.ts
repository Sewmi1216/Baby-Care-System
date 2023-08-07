import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  // @ts-ignore
  @ViewChild('userAccountForm', {static: true}) public userAccountForm: NgForm;

  useraccount = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    nic: ''
  };
  private users: any;
  constructor(private authService: AuthService,
              private router: Router
  ) {

  }
  ngOnInit(): void {

  }

  // setNewForm() {
  //   this.userAccountForm.resetForm();
  // }
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
