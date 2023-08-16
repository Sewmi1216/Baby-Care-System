import { Component } from '@angular/core';

@Component({
  selector: 'app-manage-user-accounts',
  templateUrl: './manage-user-accounts.component.html',
  styleUrls: ['./manage-user-accounts.component.css']
})
export class ManageUserAccountsComponent {

  items: any[] = [
    { name: 'Sewmi Thimaya', email: 'sewmithimaya@gmail.com', status: 'Active' },
    // ... Add more items ...
  ];

  filterActiveStatus = false;
  filteredItems: any[] = [];

  toggleFilter() {
    this.filterActiveStatus = !this.filterActiveStatus;
    this.updateFilteredItems();
  }

  updateFilteredItems() {
    if (this.filterActiveStatus) {
      this.filteredItems = this.items.filter(item => item.status === 'Active');
    } else {
      this.filteredItems = this.items;
    }
  }
}
