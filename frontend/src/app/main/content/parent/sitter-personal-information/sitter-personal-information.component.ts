import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from 'src/app/service/parent.service';

@Component({
  selector: 'app-sitter-personal-information',
  templateUrl: './sitter-personal-information.component.html',
  styleUrls: ['./sitter-personal-information.component.css']
})

export class SitterPersonalInformationComponent {
  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  requestForm = {
    parent: '',
    isAccept: '',
    workExpectation: [
      {
        date: '',
        fromTime: '',
        toTime: '',
      }
    ],
    numberofBabies: '',
    babyDetails: [
      {
        age: Number( ),
        gender: '',
      }
    ],
    specialNeeds: '',
  }

  constructor(
    private parentService: ParentService
  ){}

  ngOnInit():void{

  }

  onSubmit() {
    console.log("Submitting form...");
    this.parentService.addRequestForm(this.requestForm).subscribe(
      (data) => {
        console.log("Registration successful:", data);
        console.log("Successfully");
      },
      (err) => {
        console.log('Registration failed:', err);
        console.log('Unsuccess');
      }
    )
  }

  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  times = ["12.00", "01.00", "02.00", "03.00", "04.00", "05.00", "06.00", "07.00", "08.00", "09.00", "10.00", "11.00"]
  babyDetails: { age: number, gender: string }[] = [];


  insertRow() {
    this.babyDetails.push({ age: Number(''), gender: ''});
  }

  deleteRow() {
    this.babyDetails.splice(1);
  } 
}

