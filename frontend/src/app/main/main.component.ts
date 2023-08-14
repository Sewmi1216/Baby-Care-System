import { Component } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isCollapsed = false;
  private user: any;

  constructor(private loginService: LoginService, private router: Router) {
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  logout() {
    this.loginService.logout(this.user).subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
      console.log("logout Successfully");
      this.router.navigate(['/login'])
    }, (err) => {
      console.log("unsuccessful logout");
    })

  }
}
