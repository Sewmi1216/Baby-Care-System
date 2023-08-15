import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-parent-signup',
  templateUrl: './parent-signup.component.html',
  styleUrls: ['./parent-signup.component.css']
})
export class ParentSignupComponent implements OnInit{
  @ViewChild('userAccountForm', { static: true }) public userAccountForm!: NgForm;

  useraccount = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpassword:'',
    password: '',
    address: '',
    nic: ''
  };
  private users: any;
  private currentTab = 0;
  private stepIndicators: HTMLElement[] = [];


  constructor(
    private authService: AuthService, private toast: NgToastService, private router:Router
  ) {}

  ngOnInit(): void {

  }


  onSubmit() {
    console.log("Submitting form...");
    this.authService.register(this.useraccount).subscribe(
      (data) => {
        this.router.navigate(['/login'])
        this.toast.success({detail:"SUCCESS",summary:data.message, position:'topCenter'});
        console.log("Registration successful:", data);
        console.log("Successfully");

      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter', sticky:true});
        console.log('Registration failed:', err);
      }
    );
  }

}