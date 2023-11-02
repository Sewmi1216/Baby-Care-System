import { Component, OnInit } from '@angular/core';
import { ParentService } from "../../../../../service/parent.service";

interface TaskList {
  _id: string;
  parent: string;
  Babysitter: string;
  taskListName: string;
  date: Date;
  tasks: {
    taskName: string;
    time: string;
    isRemainder: boolean | null;
    isCompleted: boolean | null;
    specialNote: string | null;
    _id: string;
  }[];
  __v: number;
}


@Component({
  selector: 'app-next-task-lists',
  templateUrl: './next-task-lists.component.html',
  styleUrls: ['./next-task-lists.component.css']
})
export class NextTaskListsComponent implements OnInit {
  nextTaskLists: any[] = []; // Define a property to store the upcoming task lists

  constructor(private parentService: ParentService) {}

  ngOnInit(): void {
    this.getNextTaskLists();
  }

  taskLists: TaskList[] = [];


  getNextTaskLists() {
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      this.parentService.getAllNextTaskLists(JSON.parse(userJSON)).subscribe(
        (response) => {
          console.log(response);
          // this.nextTaskLists = response.NextAllTaskLists;
          this.taskLists = response.nextTaskLists;
        },
        (error) => {
          console.error('Error fetching upcoming task lists:', error);
        }
      );
    }
  }





}
