import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {ParentService} from "../../../../service/parent.service";
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from "@angular/router";

import {DatePipe} from "@angular/common";
@Component({
  selector: 'app-baby-details',
  templateUrl: './baby-details.component.html',
  styleUrls: ['./baby-details.component.css']
})
export class BabyDetailsComponent implements OnInit{
  @ViewChild('addBabyForm', { static: true }) public addBabyForm!: NgForm;

  parentId: string | null = null;
  babies: any[] = [];
  baby = {
    id:'',
    firstName: '',
    lastName: '',
    gender:'',
    birthDate:'',
    img:''
  };

  private userId: any;
  today = new Date();
  image:string=''

  constructor(
    private route: ActivatedRoute,private parentService: ParentService, private toast: NgToastService, private router:Router,private cookieService: CookieService
  ) {}
  getMinDate() {
    return this.getFormattedDate();
  }
  getCurDate(): Date {
    return new Date();
  }
  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${month}/${day}/${year}`;
  }

  getFormattedDate() {
    const currentDate = this.getCurDate();
    return this.formatDate(currentDate);
  }
 // const accessToken = this.cookieService.get('access_token');
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.parentId = params['parentId'];
      this.getBabies();
    });

  }
  calculateAge(birthDate: string): string {
    const birthDateObj = new Date(birthDate);
    const ageInMilliseconds = this.today.getTime() - birthDateObj.getTime();
    const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const ageInMonths = Math.floor((ageInMilliseconds / (1000 * 60 * 60 * 24)) % 365.25 / 30.4375);
    const ageInDays = Math.floor((ageInMilliseconds / (1000 * 60 * 60 * 24)) % 30.4375);

    return `${ageInYears} years ${ageInMonths} months ${ageInDays} days`;
  }
  getBabies() {
    // @ts-ignore
    this.parentService.getBabies(JSON.parse(localStorage.getItem('user'))).subscribe(
      (response) => {
        this.babies = response.babies;
        console.log(this.babies);
      },
      (error) => {
      //  console.log(localStorage.getItem('user'))
        console.error('Error fetching babies:', error);
        this.toast.error({detail:"ERROR",summary:"No babies were added", position:'topCenter'});
      }
    );
  }
  // getBabyImg() {
  //   const userJSON = localStorage.getItem('user');
  //
  //   if (userJSON !== null) {
  //     this.authService.getImg(JSON.parse(userJSON)).subscribe(
  //       (response) => {
  //         console.log(response.imageUrl)
  //         this.profile=response.imageUrl
  //       },
  //       (error) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }


  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      console.log(file)
      this.baby.img = file
    }
  }

  onSubmit() {
    // @ts-ignore
    const userId= JSON.parse(localStorage.getItem('user')).id
    const formdata = new FormData()
    formdata.append('userId', userId);
    formdata.append('firstName', this.baby.firstName);
    formdata.append('lastName', this.baby.lastName);
    formdata.append('gender', this.baby.gender);
    formdata.append('birthDate', this.baby.birthDate);
    formdata.append('file', this.baby.img)
     console.log(formdata);
    this.parentService.addBaby(formdata).subscribe(
      (data) => {
        this.router.navigate(['/parent/baby_details/', userId])
        this.toast.success({detail:"SUCCESS",summary:'Baby added successfully', position:'topCenter'});
        console.log("Baby added successful:", data);

      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
        console.log(`unsuccessful baby:${err}`, err);
      }
    );
  }

}
