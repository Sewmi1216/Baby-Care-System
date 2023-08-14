import {Component, OnInit} from '@angular/core';
import{ MatTabsModule} from "@angular/material/tabs";

@Component({
  selector: 'app-task-list-home',
  templateUrl: './task-list-home.component.html',
  styleUrls: ['./task-list-home.component.css'],

})
export class TaskListHomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {}


  isActive: boolean = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }



}

