// sitter-personal-information.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';


interface WorkExpectation {
  date: string; // Change the type if needed
  fromTime: string;
  toTime: string;
}

interface BabyDetail {
  years: number | null;
  months: number | null;
  gender: string | null;
}

interface RequestForm {
  isAccept: string;
  workExpectation: WorkExpectation[];
  babyDetails: BabyDetail[];
  specialNeeds: string;
  Babysitter: string
}

@Component({
  selector: 'app-sitter-personal-information',
  templateUrl: './sitter-personal-information.component.html',
  styleUrls: ['./sitter-personal-information.component.css']
})

export class SitterPersonalInformationComponent {

  babysitterProfile = {
    _id: '',
    userId: '',
    age: '',
    gender: '',
    image:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    religon: '',
    language: '',
  };

  babysitterFullName: string | null = null;

  babysitter = {
    years: '',
    age: '',
    image: '',
  };

  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  babysitterId: string | null = null; // Initialize the babysitterId variable
  parentId:  string = ''


  requestForm: RequestForm = {
    // parent: '',
    isAccept: '',
    workExpectation: [],
    babyDetails: [],
    specialNeeds: '',
    Babysitter: ''
  };
  private userId: any;

  

  yearsFieldValue: number | null = null; // Initialize here
  monthsFieldValue: number | null = null;
  genderFieldValue: string | null = null;
  selectedDays: string[] = [];
  fromTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  toTimeFieldValues: string[] = ['', '', '', '', '', '', ''];
  ageValues: (number | null)[] = []; // Allow null values
  genderValues: (string | null)[] = [];
  babydetail: any[]=[];
  specialNeeds: string = '';

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['babysitter_id'];
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }

  onCheckboxChange(day: string, index: number) {
    if (this.selectedDays[index] === day) {
      this.selectedDays[index] = '';
    } else {
      this.selectedDays[index] = day;
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
    if (this.yearsFieldValue !== null && this.yearsFieldValue !== null && this.genderFieldValue !== null) {
      const newBabyDetail: BabyDetail = {
        years: this.yearsFieldValue,
        months: this.monthsFieldValue,
        gender: this.genderFieldValue,
      };

      this.requestForm.babyDetails.push(newBabyDetail);

      // Clear the form fields after adding the details
      this.yearsFieldValue = null;
      this.monthsFieldValue = null;
      this.genderFieldValue = null;

      this.babydetail.push(newBabyDetail);
    }
  }
 
  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const userString = JSON.parse(userJSON); // Use the User interface
      console.log(userString);
      this.parentId = userString.id;
      console.log(this.parentId)
    }
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          console.log(this.babysitterProfile)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          console.log(this.babysitterProfile);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  onSubmit() {
    if(this.requestFormForm.valid){
      this.saveWorkExpectations();
      this.saveSpecialNeeds();
      // this.saveBabyDetail();
      this.requestForm.Babysitter = this.babysitterProfile._id;
      
      const userJSON = localStorage.getItem('user');
  
      if(userJSON !== null){
        const userString: string = JSON.parse(userJSON);
        // console.log(this.requestForm.babyDetails)
        // console.log(this.userId);
        console.log("Submitting form...");
        console.log(this.requestForm);
        console.log(userString)
        this.parentService.addRequestForm(this.requestForm, userString).subscribe(
          (data) => {
            console.log("Registration successful:", data);
            this.toast.success({detail:"SUCCESS",summary:'Request form added successfully', position:'topCenter'});
            console.log("Successfully");
            this.router.navigate([`parent/requested_babysitters/${this.parentId}`]);
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
}