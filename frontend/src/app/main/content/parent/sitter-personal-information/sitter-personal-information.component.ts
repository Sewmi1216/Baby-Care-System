// sitter-personal-information.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

interface WorkExpectation {
  date: string; // Change the type if needed
  fromTime: string;
  toTime: string;
}

interface BabyDetail {
  age: number | null;
  gender: string | null;
}

interface RequestForm {
  isAccept: string;
  workExpectation: WorkExpectation[];
  babyDetails: BabyDetail[];
  specialNeeds: string;
}

@Component({
  selector: 'app-sitter-personal-information',
  templateUrl: './sitter-personal-information.component.html',
  styleUrls: ['./sitter-personal-information.component.css']
})

export class SitterPersonalInformationComponent {
  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  requestForm: RequestForm = {
    // parent: '',
    isAccept: '',
    workExpectation: [],
    babyDetails: [],
    specialNeeds: ''
  };
  private userId: any;

  ageFieldValue: number | null = null; // Initialize here
  genderFieldValue: string | null = null;
  selectedDays: string[] = [];
  fromTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  toTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  ageValues: (number | null)[] = []; // Allow null values
  genderValues: (string | null)[] = [];
  babydetail: any[]=[];
  specialNeeds: string = '';

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService
  ){}

  ngOnInit():void{
  }

  onCheckboxChange(day: string, index: number) {
    if (this.selectedDays[index] === day) {
      this.selectedDays[index] = '';
    } else {
      this.selectedDays[index] = day;
    }
  }

  saveBabyDetail() {
    if (this.ageFieldValue !== null && this.genderFieldValue !== null) {
      const newBabyDetail: BabyDetail = {
        age: this.ageFieldValue,
        gender: this.genderFieldValue,
      };

      this.requestForm.babyDetails.push(newBabyDetail);

      // Clear the form fields after adding the details
      this.ageFieldValue = null;
      this.genderFieldValue = null;
    }
  }

  deleteBabyDetail(index: number) {
    if (index >= 0 && index < this.requestForm.babyDetails.length) {
      this.requestForm.babyDetails.splice(index, 1);
      this.babydetail.splice(index, 1); // Remove from the local array as well
    }
  }

  saveWorkExpectations() {
    // Initialize as an empty array of WorkExpectation objects
    this.requestForm.workExpectation = [];
    // Filter out entries with null values and convert to objects
    this.selectedDays.forEach((selected, i) => {
      if (selected !== null && this.fromTimeFieldValues[i] !== null && this.toTimeFieldValues[i] !== null) {
        const workExpectation: WorkExpectation = {
          date: selected,
          fromTime: this.fromTimeFieldValues[i],
          toTime: this.toTimeFieldValues[i]
        };
        this.requestForm.workExpectation.push(workExpectation);
      }
    });
  }

  saveSpecialNeeds(){
    this.requestForm.specialNeeds = this.specialNeeds;
  }

  saveBabyDetails() {
    if (this.ageFieldValue !== null && this.genderFieldValue !== null) {
      const newBabyDetail: BabyDetail = {
        age: this.ageFieldValue,
        gender: this.genderFieldValue,
      };

      this.requestForm.babyDetails.push(newBabyDetail);

      // Clear the form fields after adding the details
      this.ageFieldValue = null;
      this.genderFieldValue = null;

      this.babydetail.push(newBabyDetail);
    }
  }

  onSubmit() {
    this.saveWorkExpectations();
    this.saveSpecialNeeds();
    this.saveBabyDetail();

    const userJSON = localStorage.getItem('user');

    if(userJSON !== null){
      const userString: string = JSON.parse(userJSON);
      // console.log(this.requestForm.babyDetails)
      // console.log(this.userId);
      console.log("Submitting form...");
      console.log(this.requestForm);
      this.parentService.addRequestForm(this.requestForm, userString).subscribe(
        (data) => {
          console.log("Registration successful:", data);
          this.toast.success({detail:"SUCCESS",summary:'Baby added successfully', position:'topCenter'});
          console.log("Successfully");
        },
        (err) => {
          this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
    else{
      console.log("Error")
      console.error("User data in localStorage is null.");
    }
  }
}