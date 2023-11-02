import {Component, ElementRef, OnInit} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";


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
  selector: 'app-task-list-home',
  templateUrl: './task-list-home.component.html',
  styleUrls: ['./task-list-home.component.css'],

})

export class TaskListHomeComponent implements OnInit {

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

    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) {
  }

  ngOnInit(): void {
    //this.getTaskListTemplates();
    this.getTodayTaskList();
    this.sortTasks();
  }

  sortTasks() {
    this.taskDetails = this.sortTasksByTime(this.taskDetails);
  }

  sortTasksByTime(tasks: TaskListItems[]): TaskListItems[] {
    // Separate tasks with time and tasks without time
    const tasksWithTime = tasks.filter(task => task.time);
    const tasksWithoutTime = tasks.filter(task => !task.time);

    // Sort tasks with time in ascending order
    tasksWithTime.sort((a, b) => {
      // Convert time strings to Date objects for comparison
      const timeA = a.time ? new Date(a.time) : null;
      const timeB = b.time ? new Date(b.time) : null;

      if (timeA && timeB) {
        return timeA.getTime() - timeB.getTime();
      }

      return 0;
    });

    // Concatenate tasks with time and tasks without time
    return [...tasksWithTime, ...tasksWithoutTime];
  }


  getTodayTaskList() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTodayTaskList(JSON.parse(userJSON)).subscribe(
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

}
