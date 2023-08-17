import { Component } from '@angular/core';

@Component({
  selector: 'app-view-babysitter-verify',
  templateUrl: './view-babysitter-verify.component.html',
  styleUrls: ['./view-babysitter-verify.component.css']
})


export class ViewBabysitterVerifyComponent {
  showReasonInput: boolean = false;
  deactivationReason: string = '';

  deactivateUser() {
    this.showReasonInput = true;
  }

  submitDeactivation() {
    if (this.deactivationReason.trim() !== '') {
      // Here you can perform the deactivation process and submit the reason
      console.log("User deactivated with reason:", this.deactivationReason);
      // Reset values
      this.showReasonInput = false;
      this.deactivationReason = '';
    }
  }
  // ... (component properties and methods)
}