import { Component , OnInit } from '@angular/core';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

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
  };

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router:Router,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the baby_id parameter from the route
    this.route.params.subscribe(params => {
      this.babyId = params['baby_id'];
      console.log(this.babyId);
      this.getBaby();
    });
  }

  getBaby() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBaby(this.babyId).subscribe(
        (response) => {
          this.baby = response.baby;
          console.log('Baby data:', this.baby); // Add this log to check if the baby object is correctly populated
        },
        (error) => {
          console.log(localStorage.getItem('user'));
          console.error('Error fetching baby details:', error);
        }
      );
    }
  }

}
