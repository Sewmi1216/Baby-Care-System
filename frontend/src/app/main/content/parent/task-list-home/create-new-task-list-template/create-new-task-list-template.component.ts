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

  //babysitterId: string | null = null;
  taskListForm: TaskListForm = {
    taskListName: '',
    date: '',
    tasks: [],
    //Babysitter: ''
  };

  private userId: any;
  nameOfTaskList: string = '';
  date: string | null = null;
  tasks: any[] = [];
  taskName: string | null = null;
  time: string | null = null;


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
    // this.route.params.subscribe(params => {
    //   this.babysitterId = params['babysitter_id'];
    //   console.log(this.babysitterId);
    //   this.getBabysitter();
    // });
  }

  // getBabysitter() {
  //   const userJSON = localStorage.getItem('user');
  //   console.log(this.babysitterId);
  //   if (userJSON !== null) {
  //     this.parentService.getBabysitter(this.babysitterId).subscribe(
  //       (response) => {
  //         this.babysitterProfile = response.babysitter;
  //         console.log(this.babysitterProfile)
  //         this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
  //         console.log(this.babysitterProfile);
  //       },
  //       (error) => {
  //         console.log(localStorage.getItem('user'))
  //         console.error('Error fetching babysitters:', error);
  //       }
  //     )
  //   }
  // }

  deleteTaskDetails(index: number) {
    if (index >= 0 && index < this.taskListForm.tasks.length) {
      this.taskListForm.tasks.splice(index, 1);
      this.tasks.splice(index, 1);
    }
  }

  onSubmit() {

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
          this.toast.success({detail:"SUCCESS",summary:'Baby added successfully', position:'topCenter'});
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


  saveTaskListName() {
    this.taskListForm.taskListName = this.nameOfTaskList;
  }

  saveTaskListDate(){
    this.taskListForm.date = null;
  }

  addNewRow() {
    if (this.taskName !== null && this.time !== null) {
      const newTaskListItems: TaskListItems = {
        taskName: this.taskName,
        time: this.time,
        isRemainder: null,
        isCompleted: null,
        specialNote: null
      };
      this.taskListForm.tasks.push(newTaskListItems);
      this.taskName = null;
      this.time = null;

      // Show a success message using the alert function.
      alert("Task added successfully!");
    } else {
      // Show an error message using the alert function.
      alert("Error: Task name and time are required.");
    }
  }

}
