import { Component } from '@angular/core';

@Component({
  selector: 'app-handle-complaints-view-more',
  templateUrl: './handle-complaints-view-more.component.html',
  styleUrls: ['./handle-complaints-view-more.component.css']
})
export class HandleComplaintsViewMoreComponent {
  isSolved = false;

  showSolvedDetails() {
    // Implement logic to fetch admin details
    // For demonstration, we're just setting isSolved to true
    this.isSolved = true;
  }


}
