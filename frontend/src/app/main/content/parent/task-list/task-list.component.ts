import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms"; // import NgForm

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit{

  taskArray = [{
    taskName : 'Brush Teeth' , isCompleted: false
  }]

   // protected readonly onsubmit = onsubmit;
  constructor() {
  }

  ngOnInit(): void{

  }

  onSubmit(form: NgForm){
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      isCompleted: false
    })
  }
}
