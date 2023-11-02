import {Component, OnInit} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

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

  babyId: string | null = null;
  baby: { id: string, birthDate: string } = {id: '', birthDate: ''};
  ageGroups: any[] = [];
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
    private CookieService: CookieService,
    private route: ActivatedRoute
  ) {
  }

  selectedAgeGroupId!: string;
  today = new Date();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.babyId = params['baby_id'];
      console.log(this.babyId); // This should print the correct value
      this.getBaby(); // Call getBaby after setting this.babyId
      this.getAgeGroup(); // Get the age groups
    });

    // Calculate the age in months
    const ageInMonths = this.calculateAgeInMonths(this.baby.birthDate);
    console.log(ageInMonths);

    // Get the default age group based on age in months
    this.selectedAgeGroupId = this.getDefaultAgeGroup(ageInMonths);

    // Call getParameters with the default age group
    this.getParameters(this.selectedAgeGroupId);
    console.log(this.selectedAgeGroupId);
  }

  getBaby() {
    const userJSON = localStorage.getItem('user');
    console.log(this.babyId);
    if (userJSON !== null) {
      this.parentService.getBaby(this.babyId).subscribe(
        (response) => {
          this.baby = response.baby;
          const ageInMonths = this.calculateAgeInMonths(this.baby.birthDate);
          this.selectedAgeGroupId = this.getDefaultAgeGroup(ageInMonths);
          this.getParameters(this.selectedAgeGroupId);

        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error fetching baby details:', error);
        }
      )
    }
  }


  calculateAgeInMonths(birthDate: string): number {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    console.log(today);
    console.log(birthDateObj);

    const yearsDiff = today.getFullYear() - birthDateObj.getFullYear();
    const monthsDiff = today.getMonth() - birthDateObj.getMonth();

    // Calculate the age in months
    const ageInMonths = yearsDiff * 12 + monthsDiff;
    console.log(ageInMonths);

    return ageInMonths;
  }


  getDefaultAgeGroup(ageInMonths: number): string {
    let ageGroupId: string = ""; // Initialize the age group ID variable

    if (ageInMonths >= 0 && ageInMonths < 2) {
      ageGroupId = "64fff0a2dba1d5e14100c6d3";
    } else if (ageInMonths >= 2 && ageInMonths < 4) {
      ageGroupId = "64fff11bdba1d5e14100c6d5";
    } else if (ageInMonths >= 4 && ageInMonths < 6) {
      ageGroupId = "64fff12edba1d5e14100c6d6";
    } else if (ageInMonths >= 6 && ageInMonths < 9) {
      ageGroupId = "64fff149dba1d5e14100c6d7";
    } else if (ageInMonths >= 9 && ageInMonths < 12) {
      ageGroupId = "64fff15cdba1d5e14100c6d8";
    } else if (ageInMonths >= 12 && ageInMonths < 18) {
      ageGroupId = "64fff174dba1d5e14100c6d9";
    } else if (ageInMonths >= 18 && ageInMonths < 24) {
      ageGroupId = "64fff11bdba1d5e14100c6d5";
    } else if (ageInMonths >= 24 && ageInMonths < 36) {
      ageGroupId = "64fff197dba1d5e14100c6da";
    } else if (ageInMonths >= 36 && ageInMonths < 48) {
      ageGroupId = "64fff1cedba1d5e14100c6db";
    } else if (ageInMonths >= 48 && ageInMonths < 60) {
      ageGroupId = "64fff1e3dba1d5e14100c6dc";
    }

    return ageGroupId;
  }


  getAgeGroup() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getAgeGroups(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.ageGroups = response.ageGroups;
          console.log(this.ageGroups)
        },
        (error) => {
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
    console.log(selectedAgeGroupId);
    this.parentService.getParameters(selectedAgeGroupId).subscribe(
      (response) => {
        this.parameters = response.parameters;
        console.log('Parameters:', this.parameters);
        // Filter parameters into type-specific arrays
        this.movementPhysicalDevelopmentParameters = this.filterParametersByType('MOVEMENT/PHYSICAL DEVELOPMENT');
        this.languageAndCommunicationParameters = this.filterParametersByType('LANGUAGE/COMMUNICATION');
        this.socialEmotionalDevelopmentParameters = this.filterParametersByType('SOCIAL/EMOTIONAL');
        this.cognitiveDevelopmentParameters = this.filterParametersByType('COGNITIVE (learning, thinking, problem-solving)');
        console.log(this.movementPhysicalDevelopmentParameters);
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





