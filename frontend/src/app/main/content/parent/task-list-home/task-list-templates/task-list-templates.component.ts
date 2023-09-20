import { Component, Input, ViewChild, OnInit ,ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ParentService } from "../../../../../service/parent.service";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import {userAgentInstance} from "@apizee/apirtc";

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
  selector: 'app-task-list-templates',
  templateUrl: './task-list-templates.component.html',
  styleUrls: ['./task-list-templates.component.css']
})
export class TaskListTemplatesComponent {

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

  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

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

  deleteTemplate(taskListId: string){
    console.log(taskListId);
    const userJSON = localStorage.getItem('user');
    console.log(taskListId)
    if (userJSON !== null) {
      this.parentService.deleteTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
        (response) => {
          console.log(response);
          window.location.reload();
        },
        (error) => {
          console.log(localStorage.getItem('user'))
          console.error('Error with delete Task List Template:', error);
        }
      )
    }
  }

  updateTemplate(taskListId: string){

  }


  openAddDateModal(){
    // console.log(taskListId);
    // const userJSON = localStorage.getItem('user');
    // if (userJSON !== null) {
    //   this.parentService.getTaskListTemplate(JSON.parse(userJSON),taskListId).subscribe(
    //     (response) => {
    //
    //
    //     },
    //     (error) => {
    //       console.error('Error fetching task list templates:', error);
    //     }
    //   )
    // }
  }

  // addDate(taskListId:string){
  //   console.log(taskListId);
  //   this.date = this.date;
  //   console.log(this.date);
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getTaskListTemplate(JSON.parse(userJSON),taskListId).subscribe(
  //       (response) => {
  //         console.log(response);
  //         const selectedTemplate = response;
  //         console.log(selectedTemplate);
  //         this.taskListName = selectedTemplate.taskListName;
  //         this.taskDetails = selectedTemplate.tasks;
  //         console.log(this.taskListName);
  //         console.log(this.taskDetails);
  //         console.log(response.taskListName);
  //
  //
  //
  //       },
  //       (error) => {
  //         console.error('Error fetching task list templates:', error);
  //       }
  //     )
  //   }

 // }

  // addDate(taskListId: string) {
  //   console.log(taskListId);
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
  //       (response) => {
  //         console.log(response);
  //
  //         // Check if taskListName and tasks are nested under a property like "data"
  //         const selectedTemplate = response; // You may need to adjust this based on your response structure
  //         const data = selectedTemplate.data; // Access the "data" property
  //
  //         if (data) {
  //           // Now you can access taskListName and tasks
  //           this.taskListName = data.taskListName;
  //           this.taskDetails = data.tasks;
  //           console.log(this.taskListName);
  //           console.log(this.taskDetails);
  //         } else {
  //           console.error('No "data" property found in the response.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching task list templates:', error);
  //       }
  //     );
  //   }
  // }


  // addDate(taskListId: string) {
  //   console.log(taskListId);
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
  //       (response) => {
  //         console.log('Response:', response); // Print the entire response
  //         // Rest of your code...
  //       },
  //       (error) => {
  //         console.error('Error fetching task list templates:', error);
  //       }
  //     );
  //   }
  // }


  // addDate(taskListId: string) {
  //   console.log(taskListId);
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
  //       (response) => {
  //         console.log('Response:', response); // Print the entire response
  //
  //         // Check if the response contains the task list template
  //         if (response && response.taskListName && response.tasks) {
  //           this.taskListName = response.taskListName;
  //           this.taskDetails = response.tasks;
  //           console.log(this.taskListName);
  //           console.log(this.taskDetails);
  //         } else {
  //           console.error('One or more properties are undefined in the response.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching task list template:', error);
  //       }
  //     );
  //   }
  // }

  // addDate(taskListId: string) {
  //   console.log(taskListId);
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
  //       (response) => {
  //         console.log('Response:', response); // Print the entire response
  //
  //         // Check if response contains the expected properties
  //         if ('taskListName' in response && 'tasks' in response) {
  //           // Assign values to component properties
  //           this.taskListName = response.taskListName;
  //           this.taskDetails = response.tasks;
  //         } else {
  //           console.error('One or more properties are undefined in the response.');
  //         }
  //
  //         // Rest of your code...
  //       },
  //       (error) => {
  //         console.error('Error fetching task list templates:', error);
  //       }
  //     );
  //   }
  // }

  addDate(taskListId: string) {
    console.log(taskListId);
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
        (response) => {
          console.log('Response:', response); // Print the entire response to inspect its structure

          // Check if taskListName and tasks are present in the response
          if (response.taskListName && response.tasks) {
            // Access the properties
            this.taskListName = response.taskListName;
            this.taskDetails = response.tasks;
            console.log('Task List Name:', this.taskListName);
            console.log('Task Details:', this.taskDetails);
          } else {
            console.error('taskListName and/or tasks not found in the response');
          }

          // Rest of your code...
        },
        (error) => {
          console.error('Error fetching task list templates:', error);
        }
      );
    }
  }




}

