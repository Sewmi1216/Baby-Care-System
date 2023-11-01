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


          // this.tListForm  = response.todayTaskList.taskListForms;
          // this.tListName = response.todayTaskList.taskListName;
          // this.tDetails = response.tasks;
          //
          // console.log(response);
          // console.log(response.todayTaskList);

        },
        (error) => {
          console.error('Error fetching today task list:', error);
        }
      );
    }
  }

}
