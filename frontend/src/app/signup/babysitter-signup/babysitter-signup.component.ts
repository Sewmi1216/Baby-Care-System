import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-babysitter-signup',
  templateUrl: './babysitter-signup.component.html',
  styleUrls: ['./babysitter-signup.component.css']
})
export class BabysitterSignupComponent implements OnInit{
  @ViewChild('userAccountForm', { static: true }) public userAccountForm!: NgForm;

  selectedFile: File | null = null;


  useraccount = {
    role:'Babysitter',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cpassword:'',
    password: '',
    address: '',
    nic: '',
    age:'',
    gender:'',
    image: ''
  };

  constructor(
    private authService: AuthService, private toast: NgToastService, private router:Router

  ) {}

  ngOnInit(): void {

  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files?.length) {
      // Extract the filename from the selected file
      const filename = inputElement.files[0].name;
      // Set the useraccount.image property to the filename
      this.useraccount.image = filename;
    }
  }

  onSubmit(data:any) {
    console.log(this.useraccount)

      // console.log("Submitting form...");
      // console.log(this.useraccount)
      // console.log(this.selectedFile)
      // if (this.selectedFile) {
      //   const formData = new FormData();
      //   console.log(formData)
      //   formData.append('image', this.selectedFile);
      //   formData.append('role', this.useraccount.role);
      //   formData.append('firstName', this.useraccount.firstName);
      //   formData.append('lastName', this.useraccount.lastName);
      //   formData.append('email', this.useraccount.email);
      //   formData.append('phone', this.useraccount.phone);
      //   formData.append('cpassword', this.useraccount.cpassword);
      //   formData.append('address', this.useraccount.address);
      //   formData.append('nic', this.useraccount.nic);
      //   formData.append('age', this.useraccount.age);
      //   console.log(formData)
      //   console.log(formData.get)
  
        // Now you can send formData to your backend using an HTTP request
        this.authService.registerBabysitter(this.useraccount).subscribe(
          (data) => {
            console.log(this.useraccount)
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