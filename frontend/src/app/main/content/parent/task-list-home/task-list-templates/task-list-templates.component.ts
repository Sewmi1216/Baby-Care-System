import { Component, Input, ViewChild, OnInit ,ElementRef} from '@angular/core';
import { NgForm } from "@angular/forms";
import { ParentService } from "../../../../../service/parent.service";
import { NgToastService } from "ng-angular-popup";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";


// names of input fields in html file
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

  @ViewChild('requestFormForm', {static: true}) public requestFormForm!:NgForm;

  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private elRef: ElementRef
  ) {}

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
            // this.date = taskListForm.date;
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


  addDate(taskListId: string) {
    const todayDate = this.todayDate;
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
        (response) => {

          this.taskListForms = response.taskListForms;
          console.log(response.taskListForms);

           // this.date = taskListForm.date;
            this.taskListName = response.taskListForms.taskListName;
            console.log(this.taskListName);
            this.taskDetails = response.taskListForms.tasks;
            console.log(this.taskDetails);

            this.insertDateToTaskList(todayDate, this.taskListName, this.taskDetails)
           // this.closeModal();
        },
        (error) => {
          console.error('Error fetching task list templates:', error);
        }
      );
    }
  }

  private insertDateToTaskList(todayDate: Date | null, taskListName: string, taskDetails: any[]) {
    console.log(todayDate);
    console.log(taskListName);
    console.log(taskDetails);

    this.taskListForm.date = <Date>this.todayDate;
    this.taskListForm.taskListName = this.taskListName;
    this.taskListForm.tasks = this.taskDetails;

    const userJSON = localStorage.getItem('user');

    if (userJSON !== null) {
      const userString: string = JSON.parse(userJSON);
      console.log("Submitting form...");
      console.log(this.taskListForm);
      this.parentService.addTaskListForm(this.taskListForm, userString).subscribe(
        (data) => {
          console.log(data);
          console.log("Registration successful:", data);
          this.toast.success({detail:"SUCCESS",summary:'Task List added successfully', position:'topCenter'});
          console.log("Successfully");
        },
        (err) => {
          this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
    else{
      console.log("Error")
      console.error("User data in localStorage is null.");
    }
  }

  openUpdateModal(taskListId :string){
    console.log(taskListId);

    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
        (response) => {

          this.taskListForms = response.taskListForms;
          console.log(response.taskListForms);

          // this.date = taskListForm.date;
          this.taskListName = response.taskListForms.taskListName;
          console.log(this.taskListName);
          this.taskDetails = response.taskListForms.tasks;
          console.log(this.taskDetails);

        },
        (error) => {
          console.error('Error fetching task list template:', error);
        }
      );
    }
  }




}

