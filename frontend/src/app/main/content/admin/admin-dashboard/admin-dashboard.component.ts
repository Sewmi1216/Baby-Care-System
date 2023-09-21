import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from "../../../../service/admin.service";


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  // dataCount: number;

  // constructor(private adminService: AdminService) { }

  // ngOnInit(): void {
  //   this.dataService.getDataCount().subscribe(
  //     (response) => {
  //       this.dataCount = response.count;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
}

