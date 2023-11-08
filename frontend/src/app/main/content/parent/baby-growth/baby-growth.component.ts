import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";

@Component({
  selector: 'app-baby-growth',
  templateUrl: './baby-growth.component.html',
  styleUrls: ['./baby-growth.component.css']
})
export class BabyGrowthComponent {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group({
      height: new FormControl(''),
      weight: new FormControl(''),
      circumference: new FormControl('')
    });
  }


  addMeasurements() {
    console.log(this.myForm.value);
  }
}
