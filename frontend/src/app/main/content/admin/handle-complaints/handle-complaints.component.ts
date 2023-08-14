import { Component } from '@angular/core';

@Component({
  selector: 'app-handle-complaints',
  templateUrl: './handle-complaints.component.html',
  styleUrls: ['./handle-complaints.component.css']
})
export class HandleComplaintsComponent {

  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

}
