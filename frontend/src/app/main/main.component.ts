import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  // private user: any;
  username: any;
  user = {
    _id: '',
    firstName: '',
    lastName: '',
    role: '',
    // isfree:''
  }
  profile: string = ''

  constructor(private authService: AuthService, private router: Router, private toast: NgToastService) {
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login'])
    this.toast.success({detail: "SUCCESS", summary: "Log out Successfully", position: 'topCenter'});
  }

  ngOnInit(): void {
    this.getUser();
    this.getImg();
  }

  getImg() {
    const userJSON = localStorage.getItem('user');

    if (userJSON !== null) {
      this.authService.getImg(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response.imageUrl)
          this.profile = response.imageUrl
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    }
  }

  getUser() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {

      this.authService.getUser(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response)
          this.user = response.user;
          console.log(this.user)
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }
}
