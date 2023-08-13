import { Component } from '@angular/core';

@Component({
  selector: 'app-babysitter-admin-dashboard',
  templateUrl: './babysitter-dashboard.component.html',
  styleUrls: ['./babysitter-dashboard.component.css']
})
export class BabysitterDashboardComponent {

  feedbackData = [
    {
      name: "Danushika Wijesinghe",
      rating: 4,
      comment: "Great babysitter! Took good care of our kids.",
      expanded:false
    },
    {

      name: "Tharushi Chethana",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
    {

      name: "Ishini Ekanayake",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
    {

      name: "Nadee Rajapaksha",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
    ]

  toggleExpand(feedback: any): void {
    feedback.expanded = !feedback.expanded;
  }

}
