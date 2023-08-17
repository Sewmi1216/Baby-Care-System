import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../service/login.service";
import {NgToastService} from "ng-angular-popup";
import {ParentService} from "../service/parent.service";

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

  constructor(private loginService: LoginService, private parentService:ParentService,private router: Router,  private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log("submitting");
    this.loginService.accLogin(this.user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      this.parentService.setUserId(user['id']);
      console.log(user['id']);
      console.log(user['role']);
      if (user.msg === "Logged In Successfully") {
        if (user['role'] === 'Parent') {
          this.router.navigate(['/parent/parent_dashboard'])
        } else if (user['role'] === 'Babysitter') {
          this.router.navigate(['/babysitter/babysitter_dashboard'])
        } else if (user['role'] === 'Admin') {
          this.router.navigate(['/admin/admin_dashboard'])
        } else {
          this.router.navigate(['/domain_expert/domain_expert_dashboard'])
        }
        this.toast.success({detail:"SUCCESS",summary:user.msg, position:'topCenter'});
      } else {
        console.log("Login unsuccessful");
      }
    }, (err) => {
      this.logged = false;
      this.toast.error({detail:"ERROR",summary:err.error.msg, position:'topCenter'});
      console.log("Error during login", err);
    });
  }
}

