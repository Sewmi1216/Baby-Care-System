import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms"; // import NgForm

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  newTask: any = {}; // To store the new task input

  taskArray: any[] = []; // Array to store tasks

  // Method to handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      this.taskArray.push({taskName: this.newTask.taskName});
      this.newTask = {}; // Clear the input after adding
    }
  }

  // Add these methods to your component class
  // verifyTask(task: any): void {
  //   task.verified = true;
  // }

  toggleEditMode(task: any): void {
    task.editMode = !task.editMode;
  }

  deleteTask(task: any): void {
    const index = this.taskArray.indexOf(task);
    if (index !== -1) {
      this.taskArray.splice(index, 1); // Remove the task from the array
    }
    // protected readonly onsubmit = onsubmit;

  }

  unconfirmedTasks: any[] = []; // Initialize with unconfirmed tasks
  confirmedTasks: any[] = [];   // Initialize with confirmed tasks

  // ... Other methods ...


  verifyTask(task: any): void {
    task.verified = true;
    this.unconfirmedTasks.splice(this.unconfirmedTasks.indexOf(task), 1); // Remove from unconfirmed
    this.confirmedTasks.push(task); // Add to confirmed
  }


  constructor() {
  }


  ngOnInit(): void {

  }



}

