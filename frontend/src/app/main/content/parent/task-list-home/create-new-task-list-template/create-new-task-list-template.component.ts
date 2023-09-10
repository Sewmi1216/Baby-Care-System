import {Component, Input, ViewChild} from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ParentService} from "../../../../../service/parent.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import { Observable} from "rxjs";


/*Define interfaces*/
interface TaskListItems{
  taskName:string;
  time:Date;
  isRemainder:Boolean | null; // boolean or null , true /false/null
  isCompleted:Boolean | null;
  specialNote:string | null; // string or null
}

interface TaskListForm{
  taskListName:string;
  tasks: TaskListItems[];
  date: Date;
  Babysitter: string
}


@Component({
  selector: 'app-create-new-task-list-template',
  templateUrl: './create-new-task-list-template.component.html',
  styleUrls: ['./create-new-task-list-template.component.css']
})

export class CreateNewTaskListTemplateComponent {

  babysitterProfile = {
    _id: '',
    age: '',
    gender: '',
    image:'',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    nic: ''
  };

  babysitterFullName: string | null = null;

  babysitter = {
    age: '',
    gender: '',
    image: '',
  };


  @ViewChild('taskListFormForm',{static:true}) public taskListFormForm!:NgForm;

  babysitterId: string | null = null; // Initialize the babysitterId variable

  taskListForm:TaskListForm = {
    taskListName:'',
    date:new Date(),
    tasks:[],
    Babysitter: ''
   };

  private userId: any;

  /*ngModel set*/
  //initialize here=> empty widihata danna mullin dana values enne methanata
  nameOfTaskList:string ='';
  date:Date |null = null;
  tasks:any[]=[];
  taskName:string | null = null;
  time:Date | null = null;





  constructor(private parentService:ParentService,
              private toast:NgToastService,
              private router:Router,
              private cookieService:CookieService,
              private route:ActivatedRoute)
  { }

  ngOnInit():void{
    // Get the babysitter_id parameter from the route
    this.route.params.subscribe(params => {
      this.babysitterId = params['babysitter_id'];
      console.log(this.babysitterId);
      this.getBabysitter();
    });
  }

  getBabysitter(){
    const userJSON = localStorage.getItem('user');
    console.log(this.babysitterId);
    if(userJSON!==null){
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response) => {
          this.babysitterProfile = response.babysitter;
          console.log(this.babysitterProfile)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          console.log(this.babysitterProfile);
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }




  deleteTaskDetails(index:number){
    if( index>= 0 && index < this.taskListForm.tasks.length){
      this.taskListForm.tasks.splice(index,1);
      this.tasks.splice(index,1);
    }
  }

  onSubmit(){
   // this.saveTasksDetails();
   this.saveTaskListName();
   this.saveTaskListDate();

   this.taskListForm.Babysitter = this.babysitterProfile._id;

   const userJSON = localStorage.getItem('user');
   //parent kenek log welada balana eka ????????

   if(userJSON !== null){
     const userString:string = JSON.parse(userJSON);

     console.log("Submitting form");
     console.log(this.taskListForm);
     this.parentService.addTaskListForm(this.taskListForm, userString).subscribe(
       (data:any)=> {
         console.log("Registration successfull", data);
         this.toast.success({detail:"Success", summary:'Task List addes sucessfully',position:'topCenter'});
         console.log("Successfully");
       },
       (err:any)=> {
         this.toast.error({detail:"ERROR" ,summary:err.error.message, position:'topCenter'});
         console.log(`unsuccessful Task List form: ${err}`, err);
       }
     )
   }

   else{
     console.log("Error")
     console.error('User data in localStorage is null');
   }

  }



  saveTasksDetails(){
    if(this.taskName !== null && this.time !== null ){
      const newTaskListItems : TaskListItems = {
        taskName:this.taskName,
        time:this.time,
        isRemainder: null,
        isCompleted: null,
        specialNote: null

      };
      this.taskListForm.tasks.push(newTaskListItems);

      //clear
      this.taskName = null;
      this.time = null;
    }
  }

  saveTaskListName(){
    this.taskListForm.taskListName = this.nameOfTaskList;
  }


  saveTaskListDate(){
    // if(this.)

  }



  // deleteBabyDetail(index: number) {
  //   if (index >= 0 && index < this.requestForm.babyDetails.length) {
  //     this.requestForm.babyDetails.splice(index, 1);
  //     this.babydetail.splice(index, 1); // Remove from the local array as well
  //   }
  // }


  addNewRow(){
    if(this.taskName !== null && this.time !== null){
      const newTaskListItems: TaskListItems = {
        taskName:this.taskName,
        time:this.time,
        isRemainder: null,
        isCompleted: null,
        specialNote: null
      };
      this.taskListForm.tasks.push(newTaskListItems);

      // clear the form fileds after adding the tasks details
      this.taskName =  null;
      this.time = null;
    }
  }


  //
  // taskListName: string = ''; // task List Name
  // tasks: { name: string, time: string , reminders: string, anynote: string}[] = [{ name: '', time: '', reminders:'', anynote:'' }]; // tasks array
  //
  // tableData: { name: string, time: string, reminders:string, anynote: string }[] = [];
  // submittedTaskLists: any[] = [];

  // insertRow() {
  //   this.tableData.push({ name: '', time: '' ,reminders:'', anynote:''});
  // }
  //
  //
  //
  // addTaskList() {
  //   const newTaskList = {
  //     name: this.taskListName,
  //     tasks: this.tableData
  //
  //   };
  //   this.submittedTaskLists.push(newTaskList);
  //
  //   // Reset the form
  //   this.taskListName = '';
  //   this.tableData = [];
  // }
  //
  //
  //
  // addDate(index: number) {
  //   // Implement logic to add date to the specified task list
  // }
  //
  // updateTaskList(index: number) {
  //   // Implement logic to update the specified task list
  // }
  //
  // saveDate(){
  //
  // }
  //
  // updateData()
  // {
  //
  // }
  //
  // saveDetails()
  // {
  //
  // }


}
