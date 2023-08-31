// sitter-personal-information.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'

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
  
  // date = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  ageFieldValue: number | null = null; // Initialize here
  // Initialize here
  genderFieldValue: string = ''; // Initialize here 
  selectedDays: boolean[] = [false, false, false, false, false, false, false];
  fromTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  toTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  ageValues: (number | null)[] = []; // Allow null values
  genderValues: (string | null)[] = [];
  babydetail: any[]=[];
  specialNeeds: string = '';

  constructor(
    private parentService: ParentService
  ){}

  ngOnInit():void{

  }

  // insertRow() {
  //   const newBabyDetail: BabyDetail = {
  //     age: this.ageFieldValue,
  //     gender: this.genderFieldValue
  //   };

  //   console.log(newBabyDetail)

  //   this.babydetail.push(newBabyDetail)
  
  //   this.ageValues.push(this.ageFieldValue);
  //   this.genderValues.push(this.genderFieldValue);

  //   // Clear the form fields after adding the details
  //   this.ageFieldValue = null;
  //   this.genderFieldValue = '';
  // }

  

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
    // this.requestForm.specialNeeds = this.specialNeeds;
    
  }

  // saveSpecialNeeds(){
  //   const newBabyDetail: BabyDetail = {
  //     age: this.ageFieldValue,
  //     gender: this.genderFieldValue
  //   };
  //   const specialNeeds = {
  //     specialNeeds: this.specialNeeds,
  //   }
  //   // this.requestForm.specialNeeds= specialNeeds; 
  // }

  saveSpecialNeeds(){
    const specialNeeds = {
      specialNeeds: this.specialNeeds,
    };
    this.requestForm.specialNeeds = specialNeeds.specialNeeds; // Assign the value
  }  

  saveBabyDetails() {
    for (let i = 0; i < this.ageValues.length; i++) {
      const babyDetails = {
        age: this.ageValues[i],
        gender: this.genderValues[i]
      };
  
      this.requestForm.babyDetails[i] = babyDetails;
      // console.log(babyDetails);
    }
    // this.requestForm.specialNeeds;
  }

  onSubmit() {
    this.saveWorkExpectations();
    // this.saveSpecialNeeds();
    // this.requestForm.specialNeeds=this.specialNeeds;
    // console.log(this.requestForm.specialNeeds)
    console.log(this.requestForm.workExpectation)
    console.log(this.requestForm.babyDetails)

    this.saveBabyDetails();
    console.log("Submitting form...");
    console.log(this.requestForm);
    this.parentService.addRequestForm(this.requestForm).subscribe(
      (data) => {
        console.log("Registration successful:", data);
        console.log("Successfully");
      },
      (err) => {
        console.log('Registration failed:', err);
        console.log('Unsuccess');
        console.log(err.message);
      }
    )
  }

}