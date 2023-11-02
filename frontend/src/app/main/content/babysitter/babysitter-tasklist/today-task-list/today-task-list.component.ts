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

}
