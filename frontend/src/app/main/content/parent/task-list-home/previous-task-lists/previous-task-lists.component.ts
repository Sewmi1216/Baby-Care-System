import { Component, Input, ViewChild, OnInit ,ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ParentService } from "../../../../../service/parent.service";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

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

interface TaskList {
  _id: string;
  parent: string;
  Babysitter: string;
  taskListName: string;
  date: Date;
  tasks: {
    taskName: string;
    time: string;
    isRemainder: boolean | null;
    isCompleted: boolean | null;
    specialNote: string | null;
    _id: string;
  }[];
  __v: number;
}



@Component({
  selector: 'app-previous-task-lists',
  templateUrl: './previous-task-lists.component.html',
  styleUrls: ['./previous-task-lists.component.css']
})
export class PreviousTaskListsComponent {

  taskListForms: any[] = [];
  todayDate:Date | null = null;
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
  ) {}

  ngOnInit(): void {
    this.getAllOldTaskLists();
  }

  taskLists: TaskList[] = [];

  getAllOldTaskLists(){
    const userJSON = localStorage.getItem('user');
      if(userJSON !== null){
         this.parentService.getAllOldTaskLists(JSON.parse(userJSON)).subscribe(
          (response) =>{
            console.log(response);
            this.taskLists = response.OldAllTaskLists;
            // console.log(response);
            //
            // this.taskListForms = response.taskListForms;
            // for(const taskListForm of this.taskListForms){
            //   this.taskListName = taskListForm.taskListName;
            //   this.taskDetails = taskListForm.tasks;
            //   this.taskListId = taskListForm._id;
            // }
          },
          (error) => {
            console.error('Error fetching Old task lists.', error);
          }
        )
      }
  }




}
