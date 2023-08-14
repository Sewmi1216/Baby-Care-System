import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-user-accounts',
  templateUrl: './manage-user-accounts.component.html',
  styleUrls: ['./manage-user-accounts.component.css']
})
export class ManageUserAccountsComponent {

  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

}
