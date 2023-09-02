// sitter-personal-information.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

interface WorkExpectation {
  date: boolean; // Change the type if needed
  fromTime: string;
  toTime: string;
}

interface BabyDetail {
  age: number | null;
  gender: string | null;
}

interface RequestForm {
  // parent: string;
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
  genderFieldValue: string = '';
  selectedDays: boolean[] = [false, false, false, false, false, false, false];  
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

  insertRow() {
  if (this.ageFieldValue !== null && this.genderFieldValue !== '') {
    const newBabyDetail: BabyDetail = {
      age: this.ageFieldValue,
      gender: this.genderFieldValue
    };

    console.log(newBabyDetail);

    this.babydetail.push(newBabyDetail);

    this.ageValues.push(this.ageFieldValue);
    this.genderValues.push(this.genderFieldValue);

    // Clear the form fields after adding the details
    this.ageFieldValue = null;
    this.genderFieldValue = '';
  }
}

  deleteRow(index: number) {
    this.requestForm.babyDetails.splice(index, 1);
  }

  saveWorkExpectations() {
    this.requestForm.workExpectation = this.selectedDays.map((selected, i) => {
      return {
        date: selected,
        fromTime: this.fromTimeFieldValues[i],
        toTime: this.toTimeFieldValues[i]
      };
    });  
  }

  saveSpecialNeeds(){
    this.requestForm.specialNeeds = this.specialNeeds;
  }

  saveBabyDetails() {
    for (let i = 0; i < this.ageValues.length; i++) {
      const babyDetails = {
        age: this.ageValues[i],
        gender: this.genderValues[i]
      };
      this.requestForm.babyDetails[i] = babyDetails;
    }
  }

  onSubmit() {
    this.saveWorkExpectations();
    this.saveSpecialNeeds();
    this.saveBabyDetails();

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