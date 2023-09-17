import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-parent-my-plan',
  templateUrl: './parent-my-plan.component.html',
  styleUrls: ['./parent-my-plan.component.css']
})
export class ParentMyPlanComponent {

  isFree: boolean | undefined; // Initialize with a default value or 'undefined'

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Make a GET request to your backend API to fetch the plan information
    this.http.get<{ isFree: boolean }>('/parent/parent_my_plan').subscribe(
      (data) => {
        this.isFree = data.isFree;
        console.log('isFree:', this.isFree); // Add this line to log the value
      },
      (error) => {
        console.error('Error fetching plan information:', error);
      }
    );
  }
}

