import { Component, Input, ViewChild, OnInit } from '@angular/core';
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
  date: string | null;
  tasks: TaskListItems[];
  //Babysitter: string;
}




@Component({
  selector: 'app-create-new-task-list-template',
  templateUrl: './create-new-task-list-template.component.html',
  styleUrls: ['./create-new-task-list-template.component.css']
})

export class CreateNewTaskListTemplateComponent {

  // fetch data initialise
  //templates:any[] = [];
  taskListForms:any[] = [];
  date:string|null = null;
  taskListName:string = '';
  taskDetails:any[] = [];



  // babysitterProfile = {
  //   _id: '',
  //   age: '',
  //   gender: '',
  //   image: '',
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   nic: ''
  // };

  //babysitterFullName: string | null = null;

  // babysitter = {
  //   age: '',
  //   gender: '',
  //   image: '',
  // };

  @ViewChild('taskListFormForm', { static: true }) public taskListFormForm!: NgForm;

  //display task list templates
  // taskListTemplates: any[] = [];
  // selectedTaskList: string = '';
  // name : string = '';
  // tasksdetails:any[] = [];
  // date : string | null = null;

  // taskListTemplates: TaskListTemplate[] = [];
  // selectedTaskList: TaskListTemplate | null = null;


  // templates= {
  //   taskListName:'',
  //   tasks:[],
  //   date:''
  // };

  //babysitterId: string | null = null;
  taskListForm: TaskListForm = {
    taskListName: '',
    date: '',
    tasks: [],
    //Babysitter: ''
  };

  private userId: any;
  nameOfTaskList: string = '';
  //date: string | null = null;
  tasks: any[] = [];
  taskName: string | null = null;
  time: string | null = null;

  // task list templates as an empty array
  //taskListTemplates:any[] = [];





  // taskListTemplates: TaskListTemplate[] = [];


  // submissionStatus: string | null = null; // To track submission status

  // Add a property to track the submission status
  //submissionStatus: 'success' | 'error' | 'idle' = 'idle';
  constructor(
    private parentService: ParentService,
    private toast: NgToastService,
    private router: Router,
    private cookieService: CookieService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.getTaskListTemplate();
  }


  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }



  deleteTaskDetails(index: number) {
    if (index >= 0 && index < this.taskListForm.tasks.length) {
      this.taskListForm.tasks.splice(index, 1);
      this.tasks.splice(index, 1);
    }
  }

  navigateToTaskList() {
    this.router.navigate(['/parent/task_list_templates']);
  }

  navigateToTemplatesPage(){
    this.router.navigate(['parent/task_list_templates']);
  }

  saveAsTemplate() {

    this.saveTaskListName();
    this.saveTaskListDate();
    //this.taskListForm.Babysitter = this.babysitterProfile._id;

    //console.log(this.babysitterProfile._id);

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
         // this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
    else{
      console.log("Error")
      console.error("User data in localStorage is null.");
    }
  }



  saveTaskListName() {
    this.taskListForm.taskListName = this.nameOfTaskList;
  }

  saveTaskListDate(){
    this.taskListForm.date = null;
  }

  addNewRow() {
    if (this.taskName!.trim() !== '') {
      const newTaskListItems: TaskListItems = {
        taskName: this.taskName!,
        time: this.time ?? '', // Use the nullish coalescing operator (??) to provide a default value
        isRemainder: null,
        isCompleted: null,
        specialNote: null
      };
      this.taskListForm.tasks.push(newTaskListItems);
      this.taskName = null;
      this.time = null;

      // Show a success message using the alert function.
    } else {
      // Show an error message using the alert function.
      alert("Error: Task name is required.");
    }
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
          for(const taskListForm of this.taskListForms){
            this.date = taskListForm.date;
            this.taskListName = taskListForm.taskListName;
            console.log(this.taskListName);
            this.taskDetails = taskListForm.tasks;
            console.log(this.taskDetails);
          }
        },
        (error) => {
          console.error('Error fetching task list templates:', error);
        }
      )
    }
  }



  saveAsTaskList(){


  }

  openTaskListModal(){}







}
