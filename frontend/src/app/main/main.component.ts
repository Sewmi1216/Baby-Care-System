import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  isCollapsed = false;
  private user: any;
  username:any;

  constructor(private authService: AuthService, private router: Router, private toast:NgToastService) {
  }
  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
  // logout() {
  //   this.loginService.logout(this.user).subscribe((user) => {
  //     localStorage.setItem('user', JSON.stringify(user));
  //     console.log("logout Successfully");
  //     this.router.navigate(['/login'])
  //
  //   }, (err) => {
  //     console.log("unsuccessful logout");
  //   })

 // }
  logout() {
   // this.authService.logout();
    this.router.navigate(['/login'])
    this.toast.success({detail:"SUCCESS",summary:"Log out Successfully", position:'topCenter'});
  }

  ngOnInit(): void {
    }
}
