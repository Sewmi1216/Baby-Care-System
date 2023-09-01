import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-task-list-home',
  templateUrl: './task-list-home.component.html',
  styleUrls: ['./task-list-home.component.css'],

})
export class TaskListHomeComponent implements OnInit {

  taskList : any; // for store task list data

  //taskList: any; // fetched task list data
 // todayDate :Date = new Date(); //today's date

  constructor(private http: HttpClient) { }

  ngOnInit() {
   // this.fetchTaskListData();

    //this.todayDate = new Date();
  }

 // isActive: boolean = false;

 /* toggleActive(): void {
    this.isActive = !this.isActive;
  } */
  fetchTaskListData(){
    const url = 'http://localhost:8070/parent/addTaskList';
    this.http.get(url).subscribe((response:any)=>{
      this.taskList = response.taskList;
    })
  }



}

