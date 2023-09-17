import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ParentService } from "../../../../../service/parent.service";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";



@Component({
  selector: 'app-task-list-templates',
  templateUrl: './task-list-templates.component.html',
  styleUrls: ['./task-list-templates.component.css']
})
export class TaskListTemplatesComponent {

  // fetch data initialise
  //templates:any[] = [];

  taskListForms: any[] = [];
  date: string | null = null;
  taskListName: string = '';
  taskDetails: any[] = [];


  // for add date
  // taskListTemplates:any[]= [];
  // templateName:string='';
  // date: string | null = null;


  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

    this.getTaskListTemplate();
  }

  getTaskListTemplate() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTaskListTemplates(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response); //- this is working
          //this.templates = response.templates;
          this.taskListForms = response.taskListForms;
          console.log(response.taskListForms);
          for (const taskListForm of this.taskListForms) {
            this.date = taskListForm.date;
            this.taskListName = taskListForm.taskListName;
            //console.log(this.taskListName);
            this.taskDetails = taskListForm.tasks;
            //console.log(this.taskDetails);
            //console.log(this.parent);
            //  console.log(taskListForm._id);
          }
        },
        (error) => {
          console.error('Error fetching task list templates:', error);
        }
      )
    }
  }




  //  addDate(taskListId: any) {
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     const user = JSON.parse(userJSON);
  //     console.log(user);
  //     const userId = user.userId; // Replace 'userId' with the actual property name for the user ID in your user object
  //     this.parentService.getTaskListTemplateForAddDate(userId, taskListId).subscribe(
  //       (response) => {
  //         console.log(response);
  //       },
  //       (error) => {
  //         console.error('Error fetching task list templates:', error);
  //       }
  //     );
  //   }
  // }

  addDate(taskListId:any){

  }

  deleteTemplate(){}
  updateTemplate(){}

  saveDate(){}
}
