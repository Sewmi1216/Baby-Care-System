import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {ParentService} from "../../../../service/parent.service";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-baby-details',
  templateUrl: './baby-details.component.html',
  styleUrls: ['./baby-details.component.css']
})
export class BabyDetailsComponent implements OnInit{
  @ViewChild('addBabyForm', { static: true }) public addBabyForm!: NgForm;

  babies: any[] = [];
  baby = {
    firstName: '',
    lastName: '',
    age:'',
    gender:'',
    birthDate:''
  };
  private userId: any;


  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router,private cookieService: CookieService
  ) {}

 // const accessToken = this.cookieService.get('access_token');
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




  onSubmit() {
    console.log("Submitting form...");
    console.log(this.userId);
    this.parentService.addBaby(this.baby, this.userId).subscribe(
      (data) => {
        console.log("Successfully");
        this.router.navigate(['/parent/baby_details'])
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
