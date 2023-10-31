import {Component, OnInit} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';
import {string} from "@tensorflow/tfjs";

 interface vaccine {
  id:string;
  name:string;
  age:number;

}

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit{

  vaccines:vaccine[] = [];


  // Separate arrays for different categories of vaccination related to ag groups
  underOneYearVaccines: vaccine[] = [];
  EqualToOneYearVaccines: vaccine[] = [];
  underTwoYearVaccines: vaccine[] = [];
  underThreeYearVaccines: vaccine[] = [];
  underFourYearVaccines: vaccine[] = [];
  underFiveYearVaccines: vaccine[] = [];
  underSixYearVaccines: vaccine[] = [];

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private CookieService: CookieService
  ){}

  ngOnInit() {
    this.getVaccinesList();
  }

  getVaccinesList(){
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentService.getVaccineList(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response);
          this.vaccines = response.vaccines;
          console.log(this.vaccines);
          // Filter parameters into type-specific arrays
          this.underOneYearVaccines = this.filterByAge(2,12);// age in months
          this.EqualToOneYearVaccines = this.filterByAge(12,13);
          this.underTwoYearVaccines = this.filterByAge(13,24);
          this.underThreeYearVaccines = this.filterByAge(24,36);
          this.underFourYearVaccines = this.filterByAge(36,48);
          this.underFiveYearVaccines = this.filterByAge(48,60);
          this.underSixYearVaccines = this.filterByAge(60,72);
          console.log(this.underOneYearVaccines );
          console.log(this.underTwoYearVaccines);
          console.log(this.underThreeYearVaccines);
          console.log(this.underFourYearVaccines);
          console.log(this.underFiveYearVaccines);
          console.log(this.underSixYearVaccines);
        },
        (error)=>{
          console.log(localStorage.getItem('vaccinesList'))
          console.error('Error fetching vaccinesList:', error);
        }
      )
    }
  }


  private filterByAge(startingAge: number, endAge: number): vaccine[] {
    return this.vaccines
      .filter((vaccine) => (vaccine.age as number) >= startingAge && (vaccine.age as number) < endAge);
  }
}

