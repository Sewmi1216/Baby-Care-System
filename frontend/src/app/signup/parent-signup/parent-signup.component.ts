import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-parent-signup',
  templateUrl: './parent-signup.component.html',
  styleUrls: ['./parent-signup.component.css']
})
export class ParentSignupComponent implements OnInit {
  @ViewChild('userAccountForm', {static: true}) public userAccountForm!: NgForm;

  useraccount = {
    role: 'Parent',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpassword: '',
    password: '',
    address: '',
    nic: '',
    profile: ''
  };
  private users: any;
  private currentTab = 0;
  private stepIndicators: HTMLElement[] = [];


  constructor(
    private http: HttpClient, private authService: AuthService, private toast: NgToastService, private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      console.log(file)
      this.useraccount.profile = file
    }
  }

  onSubmit() {
    console.log("Submitting form...");
    const formdata = new FormData()
    formdata.append('role', this.useraccount.role);
    formdata.append('firstName', this.useraccount.firstName);
    formdata.append('lastName', this.useraccount.lastName);
    formdata.append('email', this.useraccount.email);
    formdata.append('phone', this.useraccount.phone);
    formdata.append('cpassword', this.useraccount.cpassword);
    formdata.append('address', this.useraccount.address);
    formdata.append('nic', this.useraccount.nic);
    formdata.append('file', this.useraccount.profile)
    console.log(formdata)
    this.authService.register(formdata).subscribe(
      (data) => {
        this.router.navigate(['/login'])
        this.toast.success({detail: "SUCCESS", summary: data.message, position: 'topCenter'});
        console.log("Registration successful:", data);
        console.log("Successfully");

      },
      (err) => {
        this.toast.error({detail: "ERROR", summary: err.error.message, position: 'topCenter', sticky: true});
        console.log('Registration failed:', err);
      }
    );
  }

}
