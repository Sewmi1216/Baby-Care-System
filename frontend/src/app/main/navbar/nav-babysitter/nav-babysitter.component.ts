import { Component } from '@angular/core';
import {ParentService} from "../../../service/parent.service";
import {AuthService} from "../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-nav-babysitter',
  templateUrl: './nav-babysitter.component.html',
  styleUrls: ['./nav-babysitter.component.css']
})
export class NavBabysitterComponent {

  user = {
    firstName: '',
    lastName: '',
    role: '',
    _id: ''
  }
  profile: string = ''
  type = {
    isFree: '',
  }

  constructor(
    private parentService: ParentService, private authService: AuthService, private toast: NgToastService, private router: Router, private cookieService: CookieService, private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getImg()
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


}
