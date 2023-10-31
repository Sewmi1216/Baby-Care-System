import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup'; // Assuming you're using ng-angular-popup
import { ParentService } from '../../../../service/parent.service';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.css']
})
export class ParentProfileComponent implements OnInit {
  newPassword: string = '';
  confirmNewPassword: string = '';
  userId: string = '';

  constructor(
    private route: ActivatedRoute,
    private toast: NgToastService, // Inject NgToastService
    private parentService: ParentService // Inject ParentService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['user_id'];
      console.log(this.userId);
    });
  }

  updatePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      // @ts-ignore
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.parentService.updatePassword(user).subscribe(
          (data) => {
            console.log("Password updated successfully:", data);
            this.toast.success({detail: "Password updated successfully", summary: 'Updated', position: 'topCenter'});
            console.log("Successfully");
            location.reload();
          },
          (err) => {
            this.toast.error({detail: "Error", summary: err.error.message, position: 'topCenter'});
            console.error(`Failed to update password: ${err}`, err);
          }
        );
      } else {
        console.error("User data not found in local storage.");
      }
    } else {
      console.error("Passwords do not match");
    }
  }
}
