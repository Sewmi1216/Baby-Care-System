import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };
  logged = true;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loginService.accLogin(this.user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log("Successfully");
      this.router.navigate(['/main/parent_dashboard'])
      // if (user !== null && user['accountType'] === 'TM') {
      //   this.router.navigate(['/main/babysitterdashboard'])
      // } else if (user['accountType'] === 'BMC') {
      //   this.router.navigate(['/main/parent-dashboard'])
      // } else {
      //   this.logged = false;
      // }
    }, (err) => {
      this.logged = false;
    })
  }
}
