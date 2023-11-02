import {Component, OnInit} from '@angular/core';
import {ParentService} from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-view-baby-details',
  templateUrl: './view-baby-details.component.html',
  styleUrls: ['./view-baby-details.component.css']
})
export class ViewBabyDetailsComponent {

  babyId: string | null = null;

  baby = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    gender: ''
  };
  img: string = ''


  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Get the baby_id parameter from the route
    this.route.params.subscribe(params => {
      this.babyId = params['baby_id'];
      this.getBaby();
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options = {year: 'numeric', month: '2-digit', day: '2-digit'};
    // @ts-ignore
    return date.toLocaleDateString('en-US', options);
  }

  getBaby() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBaby(this.babyId).subscribe(
        (response) => {
          console.log(response);
          this.baby = response.baby;
          console.log('Baby data:', this.baby); // Add this log to check if the baby object is correctly populated
          console.log(this.baby)
          this.img = response.imageUrl
          console.log(response.imageUrl)
        },
        (error) => {
          console.log(localStorage.getItem('user'));
          console.error('Error fetching baby details:', error);
        }
      );
    }
  }

}
