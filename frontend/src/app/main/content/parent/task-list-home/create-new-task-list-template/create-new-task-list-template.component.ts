import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
// import {AuthService} from "../../service/auth.service";
import {ParentService} from "../../../../../service/parent.service"
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";


@Component({
  selector: 'app-create-new-task-list-template',
  templateUrl: './create-new-task-list-template.component.html',
  styleUrls: ['./create-new-task-list-template.component.css']
})
export class CreateNewTaskListTemplateComponent {
  @ViewChild('tasklistForm', {static:true}) public tasklistForm!: NgForm;
  
  tasklist = {
    tasklistName: '',
    // parent: 
    task: [{
      taskName: '',
      time: '',
    }]
  };

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router: Router
  ){}

  ngOnInit():void{

  }
  

  onSubmit() {
    console.log("Submitting form...");
    this.parentService.addTaskList(this.tasklist).subscribe(
      (data) => {
        this.router.navigate(['/login'])
        this.toast.success({detail:"SUCCESS",summary:data.message, position:'topCenter'});
        console.log("Registration successful:", data);
        console.log("Successfully");

      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter', sticky:true});
        console.log('Registration failed:', err);
      }
    );
  }


  taskListName: string = ''; // task List Name
  tasks: { name: string, time: string , reminders: string, anynote: string}[] = [{ name: '', time: '', reminders:'', anynote:'' }]; // tasks array

  tableData: { name: string, time: string, reminders:string, anynote: string }[] = [];
  submittedTaskLists: any[] = [];

  insertRow() {
    this.tableData.push({ name: '', time: '' ,reminders:'', anynote:''});
  }

}

//   addTaskList() {
//     const newTaskList = {
//       name: this.taskListName,
//       tasks: this.tableData
//     };
//     this.submittedTaskLists.push(newTaskList);


  addTaskList() {
    const newTaskList = {
      name: this.taskListName,
      tasks: this.tableData

    };
    this.submittedTaskLists.push(newTaskList);

    // Reset the form
    this.taskListName = '';
    this.tableData = [];
  }



//   addDate(index: number) {
//     // Implement logic to add date to the specified task list
//   }

//   updateTaskList(index: number) {
//     // Implement logic to update the specified task list
//   }

//   saveDate(){

//   }

//   updateData()
//   {

//   }

//   saveDetails()
//   {

//   }


// }

