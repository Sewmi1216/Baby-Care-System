import { Component } from '@angular/core';

@Component({
  selector: 'app-sitter-personal-information',
  templateUrl: './sitter-personal-information.component.html',
  styleUrls: ['./sitter-personal-information.component.css']
})
export class SitterPersonalInformationComponent {

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

