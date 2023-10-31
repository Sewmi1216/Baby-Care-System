import {Component, OnInit} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

interface Parameter {
  id: string;
  type: string;
  activity: string;
}



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

  parameters: Parameter[] = [];

  // Separate arrays for different categories
  movementPhysicalDevelopmentParameters: Parameter[] = [];
  languageAndCommunicationParameters: Parameter[] = [];
  socialEmotionalDevelopmentParameters: Parameter[] = [];
  cognitiveDevelopmentParameters: Parameter[] = [];



  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private CookieService: CookieService
  ){}

  selectedAgeGroupId!: string;

  ngOnInit() {
    this.getAgeGroup();
  }

  getAgeGroup(){
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
    let selectedAgeGroupId = event.target.value;
    console.log('Selected age group:', selectedAgeGroupId);
    this.getParameters(selectedAgeGroupId);

  }

  // to get the relevant parameters to age group
  getParameters(selectedAgeGroupId: string) {
    this.parentService.getParameters(selectedAgeGroupId).subscribe(
      (response) => {
        this.parameters = response.parameters;
        console.log('Parameters:', this.parameters);
        // Filter parameters into type-specific arrays
        this.movementPhysicalDevelopmentParameters = this.filterParametersByType('MOVEMENT/PHYSICAL DEVELOPMENT');
        this.languageAndCommunicationParameters = this.filterParametersByType('LANGUAGE/COMMUNICATION');
        this.socialEmotionalDevelopmentParameters = this.filterParametersByType('SOCIAL/EMOTIONAL');
        this.cognitiveDevelopmentParameters = this.filterParametersByType('COGNITIVE (learning, thinking, problem-solving)');
        console.log(this.movementPhysicalDevelopmentParameters );
        console.log(this.languageAndCommunicationParameters);
        console.log(this.socialEmotionalDevelopmentParameters);
        console.log(this.cognitiveDevelopmentParameters);
      },
      (error) => {
        console.error('Error fetching parameters:', error);
      }
    );
  }

  // to filter parameters by type
  filterParametersByType(type: string): Parameter[] {
    return this.parameters.filter(parameter => parameter.type === type);
  }


}





