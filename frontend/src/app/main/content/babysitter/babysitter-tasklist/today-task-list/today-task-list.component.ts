import { Component, ElementRef, OnInit } from '@angular/core';

import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {BabysitterService} from "../../../../../service/babysitter.service";


interface TaskListItems {
  taskName: string;
  time: string;
  isRemainder: boolean | null;
  isCompleted: boolean | null;
  specialNote: string | null;
}

interface TaskListForm {
  taskListName: string;
  date: Date ;
  tasks: TaskListItems[];
  //Babysitter: string;
}

@Component({
  selector: 'app-today-task-list',
  templateUrl: './today-task-list.component.html',
  styleUrls: ['./today-task-list.component.css']
})
export class TodayTaskListComponent {


  todayTaskList:any[] = [];

  taskListForms: any[] = [];
  todayDate:Date | null = null;
  taskListName: string = '';
  taskDetails: any[] = [];
  taskListId: string='';

  searchTerm: string = '';

  filteredTaskListForms: any[] = [];


  tListForm: any = {
    date: '',
    taskListId: '',
    tasks: [],
  };
  // tListName: string = '';
  tDetails:any[] = [];


  taskListForm: TaskListForm = {
    taskListName: '',
    date: new Date(),
    tasks: [],

    //Babysitter: ''
  };

  tListName : string = '';

  constructor(
    private babysitterService: BabysitterService, private toast: NgToastService, private router: Router, private CookieService: CookieService, private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    //this.getTaskListTemplates();
    this.getTodayTaskList();
  }


  getTodayTaskList() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.babysitterService.getTodayTaskList(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response);
          console.log(response.todayTaskList);
          this.taskListForm = response.todayTaskList;
          // this.taskListName = response.todayTaskList.taskListName;
          this.taskListName = response.todayTaskList[0].taskListName;
          this.taskDetails = response.todayTaskList[0].tasks;

          console.log(this.taskListName);
          console.log(this.taskDetails);

        },
        (error) => {
          console.error('Error fetching today task list:', error);
        }
      );
    }
  }

  // onTaskCompletedChange(index: number) {
  //   // Toggle the 'isCompleted' property of the corresponding task
  //   this.taskDetails[index].isCompleted = !this.taskDetails[index].isCompleted;
  //
  //   // Update the database by making an API call
  //   const taskId = this.taskDetails[index]._id; // Replace '_id' with the actual task ID property
  //   const isCompleted = this.taskDetails[index].isCompleted;
  //
  //   this.babysitterService.updateTaskCompletion(taskId, isCompleted).subscribe(
  //     (response) => {
  //       // Handle the response from the backend (e.g., display a success message)
  //       console.log('Task completion updated:', response);
  //     },
  //     (error) => {
  //       // Handle errors (e.g., show an error message to the user)
  //       console.error('Error updating task completion:', error);
  //     }
  //   );
  // }

  onTaskCompletedChange(index: number) {
    this.taskDetails[index].isCompleted = !this.taskDetails[index].isCompleted;
    this.updateTaskListOnServer();
  }

  updateTaskListOnServer() {
    const updatedTaskList: TaskListForm = {

      taskListName: this.taskListForm.taskListName,
      date: this.taskListForm.date,
      tasks: this.taskDetails,
    };

    this.babysitterService.updateTaskList(updatedTaskList).subscribe(
      (response) => {
        console.log('Task list updated successfully:', response);
      },
      (error) => {
        console.error('Error updating task list:', error);
      }
    );
  }


}
