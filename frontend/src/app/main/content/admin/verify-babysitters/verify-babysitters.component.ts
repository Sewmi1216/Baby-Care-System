import { Component } from '@angular/core';

@Component({
  selector: 'app-verify-babysitters',
  templateUrl: './verify-babysitters.component.html',
  styleUrls: ['./verify-babysitters.component.css']
})
export class VerifyBabysittersComponent {
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
