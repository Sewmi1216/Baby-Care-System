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

  // Initialize the selectedTaskListId property with a default value
  selectedTaskListId: string = '';


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


  //  addDate(taskListId:string) {
  //    const userJSON = localStorage.getItem('user');
  //    if(userJSON !== null ) {
  //      this.parentService.getTaskListTemplate(JSON.parse(userJSON), taskListId).subscribe(
  //        (response) => {
  //        // console.log(response);
  //         this.taskListForms = response.taskListForms;
  //
  //         console.log(response);
  //         console.log(this.taskListForms);
  //        },
  //        (error) => {
  //          console.error('Error fetching task list template: ', error);
  //        }
  //      )
  //    }
  // }

  saveDate(){

    this.date = this.date;
    //this.taskListForm.taskListName = this.taskListName;
  //  this.taskDetails = this.taskListForm.tasks;

    //console.log(this.taskListForms);
    //console.log(this.date);
  // console.log(this.taskListForms);
   //console.log();
    //console.log(this.taskDetails);

    // const userJSON = localStorage.getItem('user');
    // if (userJSON !== null) {
    //   const userString: string = JSON.parse(userJSON);
    //   this.parentService.addDateToTaskListTemplate(dataToSave, userString).subscribe(
    //     // (data) => {
    //     //   console.log(data);
    //     //   console.log("Registration successful:", data);
    //     //   this.toast.success({detail:"SUCCESS",summary:'Task List added successfully', position:'topCenter'});
    //     //   console.log("Successfully");
    //     //
    //     //
    //     // },
    //     // (err) => {
    //     //   this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
    //     //   console.log(`unsuccessful requestForm:${err}`, err);
    //     // }
    //   )

    //}
    // else{
    //   console.log("Error")
    //   console.error("User data in localStorage is null.");
    // }
  }




  // saveFormData(taskListName: string, taskDetails:any){
  //    // this.taskListName  = taskListName;
  //    // this.taskDetails = taskDetails;
  //    // console.log(this.taskListName);
  //    // console.log(this.taskDetails);
  //
  //   this.savedTaskListName = taskListName;
  //   this.savedTaskDetails = taskDetails;
  //
  //   console.log(this.savedTaskListName);
  //   console.log(this.savedTaskDetails);
  // }


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

  updateTemplate(){}

  openModal(taskListId: string) {
    // Display the modal
    this.addDateTaskListModal.nativeElement.style.display = 'block';
    this.selectedTaskListId = taskListId;
  }

  // Close the modal and reset the date
  closeModal() {
    // Hide the modal
    this.addDateTaskListModal.nativeElement.style.display = 'none';
    // Reset the date and selected task list ID
    this.date = null; // You can also use this.date = new Date() to reset to the current date, if needed
    this.selectedTaskListId = ''; // Initialize with an empty string
  }

  // Insert data with the selected date
  addDateAndCreateTaskList(taskListId: string) {
    // Get the selected date from the modal input
    const selectedDate = this.date;

    // Check if a date is selected
    if (!selectedDate) {
      alert('Please select a date before saving.');
      return; // Exit the function if no date is selected
    }

    // Find the selected task list
    const selectedTaskList = this.taskListForms.find(tl => tl._id === taskListId);

    if (selectedTaskList) {
      // Create a new task list with the selected task list's details and date
      const newTaskList = {
        ...selectedTaskList,
        _id: null, // Clear the ID to create a new document
        date: selectedDate // Add the selected date
      };

      // Send the new task list to your server to save it
      this.parentService.createTaskListTemplate(newTaskList).subscribe(
        (response) => {
          // Handle success
          console.log('New task list created:', response);
          // Optionally, refresh the taskListForms array or perform other actions
        },
        (error) => {
          // Handle error
          console.error('Error creating new task list:', error);
        }
      );
    }

    // Close the modal
    this.closeModal();
  }

  // ViewChild reference to the modal
  @ViewChild('addDateTaskListModal') addDateTaskListModal: any;


}

