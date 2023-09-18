import {Component, OnInit} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-growth-parameters',
  templateUrl: './growth-parameters.component.html',
  styleUrls: ['./growth-parameters.component.css']
})
export class GrowthParametersComponent implements OnInit {
  ageGroups: any[] = [];

  ageGroup = {
    id: '',
    type: '',

  };

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private CookieService: CookieService
  ){}

  ngOnInit() {
    this.getAgeGroup();
  }

  getAgeGroup(){
    // const ageGroupJSON = localStorage.getItem('ageGroup');
    // console.log(ageGroupJSON);
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentService.getAgeGroups(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.ageGroups = response.ageGroups;
          console.log(this.ageGroups)
        },
        (error)=>{
          console.log(localStorage.getItem('ageGroup'))
          console.error('Error fetching ageGroups:', error);
        }
      )
    }
  }

  // Define the changeAgeGroup method
  changeAgeGroup(event: any) {
    // Add your logic here
    console.log('Selected age group:', event.target.value);
    // You can perform actions based on the selected age group
  }
}





