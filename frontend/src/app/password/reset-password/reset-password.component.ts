import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  password1: string = '';
  password2: string = '';

  resetPassword() {
    // Perform password validation here
    if (this.validatePassword(this.password1) && this.password1 === this.password2) {
      // Passwords are valid and match, proceed to update the user's password
      // Call your password update service here
      // Example: this.authService.updatePassword(this.password1);
      console.log('Password updated successfully');
    } else {
      console.log('Invalid password or passwords do not match');
    }
  }

  validatePassword(password: string): boolean {
    // Implement your password validation logic here
    // Example: Check for at least 8 characters, one uppercase, one lowercase, one number, and one special character
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }
}
