import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {ParentService} from "../../../../service/parent.service";
import { CookieService } from 'ngx-cookie-service';
import {string} from "@tensorflow/tfjs";
import _default from "chart.js/dist/plugins/plugin.tooltip";
import numbers = _default.defaults.animations.numbers;

interface AddBabyForm{
  firstName:string;
  lastName:string;
  age:number|null;
  gender:string;
  birthDate:Date|null;
}


@Component({
  selector: 'app-baby-details',
  templateUrl: './baby-details.component.html',
  styleUrls: ['./baby-details.component.css']
})
export class BabyDetailsComponent implements OnInit {
  @ViewChild('addBabyForm', {static: true}) public addBabyForm!: NgForm;

  AddBabyForm = {
    firstName: '',
    lastName: '',
    age: null,
    gender: '',
    birthDate: null,


  };
  private userId: any;
  babies: any[] = [];

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  // const accessToken = this.cookieService.get('access_token');

  firstName: string = '';
  age: number | null = null;
  birthDate: Date | null = null; // Initialize birthDate as null
  lastName: string = ''; // Initialize lastName as an empty string
  gender: string = ''; // Initialize gender as an empty string

  ngOnInit(): void {
    // this.userId = this.parentService.getUserId();
    // this.babyProfile = this.parentService.babyProfile;
    this.getBabies();
  }

  getBabies() {
    // @ts-ignore
    this.parentService.getBabies(JSON.parse(localStorage.getItem('user'))).subscribe(
      (response) => {
        this.babies = response.babies; // Assign fetched data to the babies array
        console.log(this.babies);
      },
      (error) => {
        console.log(localStorage.getItem('user'))
        console.error('Error fetching babies:', error);
      }
    );
  }


}
