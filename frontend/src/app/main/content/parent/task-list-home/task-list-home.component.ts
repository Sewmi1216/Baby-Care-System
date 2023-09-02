import {Component, OnInit} from '@angular/core';
import { HttpClient } from "@angular/common/http";
// import{ MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-task-list-home',
  templateUrl: './task-list-home.component.html',
  styleUrls: ['./task-list-home.component.css'],

})
export class TaskListHomeComponent implements OnInit {

  constructor() { // when app is booting this will create
    // when we call component at first time then it will run (only that time)

  }
  ngOnInit() { // when loading content page ngOnInit() will run  initially
  }

}

