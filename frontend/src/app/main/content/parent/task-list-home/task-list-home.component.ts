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

  taskListForms: any[] = [];
  // date: string | null = null;
  date:Date | null = null;
  taskListName: string = '';
  taskDetails: any[] = [];
  taskListId: string='';


  taskListForm: TaskListForm = {
    taskListName: '',
    date: new Date(),
    tasks: [],
    //Babysitter: ''
  };

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
    this.getTaskListTemplates();
  }

  getTaskListTemplates() { // get all task list templates
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTaskListTemplates(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response); //- this is working
          this.taskListForms = response.taskListForms;
          console.log(response.taskListForms);
          for (const taskListForm of this.taskListForms) {
            this.date = taskListForm.date;
            this.taskListName = taskListForm.taskListName;
            this.taskDetails = taskListForm.tasks;
            this.taskListId = taskListForm._id;
          }
        },
        (error) => {
          console.error('Error fetching task list templates:', error);
        }
      )
    }
  }

}
