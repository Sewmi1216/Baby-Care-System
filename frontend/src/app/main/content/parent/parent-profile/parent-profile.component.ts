import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css']
})
export class ParentProfileComponent implements OnInit {
  newPassword: string = '';
  confirmNewPassword: string = '';
  userId: string='';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['user_id'];
      console.log(this.userId);
    });
  }

  updatePassword() {
    if (this.newPassword === this.confirmNewPassword) {

      this.UpdatePassword();
    } else {
      console.error("Passwords do not match");
    }
  }

  UpdatePassword() {
    // Implement the logic to update the password here
    // You can use this.userId to identify the user and make the necessary API requests.
  }
}
