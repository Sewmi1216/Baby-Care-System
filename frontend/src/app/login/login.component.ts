import {Component} from '@angular/core';
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
    console.log("submitting");
    this.loginService.accLogin(this.user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log(user.msg);
      console.log(user['role']);
      if (user.msg === "Logged In Successfully") {
        if (user['role'] === 'Parent') {
          this.router.navigate(['/parent/parent_dashboard'])
        } else if (user['role'] === 'Babysitter') {
          this.router.navigate(['/babysitter/babysitter_dashboard'])
        } else if (user['role'] === 'Admin') {
          this.router.navigate(['/admin/admin_dashboard'])
        } else {
          this.router.navigate(['/domain-expert/domain_expert_dashboard'])
        }
      } else {
        console.log("Login unsuccessful");
      }
    }, (err) => {
      this.logged = false;
      console.log("Error during login");
    });
  }
}

