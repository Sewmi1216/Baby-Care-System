import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-babysitter',
  templateUrl: './my-babysitter.component.html',
  styleUrls: ['./my-babysitter.component.css']
})

export class MyBabysitterComponent {

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

  babysitterId: string = ''

  babysitterProfile = {
    _id: '',
    userId: '',
    age: '',
    gender: '',
    image:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    religon: '',
    language: '',
  };

  babysitterFullName: string | null = null;

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['babysitter_id'];
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }

  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response)=>{
          this.babysitterProfile = response.babysitter
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          console.log(this.babysitterProfile._id)
        },
        (error)=>{

        }
      )
    }
  }

  toggleExpand(feedback: any): void {
    feedback.expanded = !feedback.expanded;
  }
}
