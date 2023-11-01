import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../service/auth.service";
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

  constructor(private authService: AuthService, private parentService: ParentService, private router: Router, private toast: NgToastService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.accLogin(this.user).subscribe((user) => {
      this.authService.storeToken(user.token)
      localStorage.setItem('user', JSON.stringify(user));
      // const token = user.token;
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 7); // Cookie will expire in 7 days
      // document.cookie = `access_token=${token}; expires=${expirationDate.toUTCString()}; path=/;`;
      console.log(user['role'])
      if (user['msg'] === "login") {
        if (user['role'] === 'Parent') {
          this.router.navigate(['/parent/parent_dashboard'])
          this.toast.success({detail: "SUCCESS", summary: user.msg, position: 'topCenter'});
        } else if (user['role'] === 'Babysitter') {
          console.log(user['status'])
          if (user['status'] === "pending") {
            this.toast.error({detail: "ERROR", summary: 'Your account has not verified. Try again later', position: 'topCenter'});
          }else{
            this.router.navigate(['/babysitter/babysitter_dashboard'])
            this.toast.success({detail: "SUCCESS", summary: user.msg, position: 'topCenter'});
          }
        } else if (user['role'] === 'Admin') {
          this.router.navigate(['/admin/admin_dashboard'])
          this.toast.success({detail: "SUCCESS", summary: user.msg, position: 'topCenter'});
        } else {
          this.router.navigate(['/domain_expert/domain_expert_dashboard'])
          this.toast.success({detail: "SUCCESS", summary: user.msg, position: 'topCenter'});
        }

      } else {
        console.log("Login unsuccessful");
      }
    }, (err) => {
      this.logged = false;
      this.toast.error({detail: "ERROR", summary: err.error.msg, position: 'topCenter'});
      console.log("Error during login", err);
    });
  }
}

