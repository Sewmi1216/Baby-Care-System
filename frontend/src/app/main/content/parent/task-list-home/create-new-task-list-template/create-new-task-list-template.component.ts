import { Component, Input } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Output} from "@angular/core";


@Component({
  selector: 'app-create-new-task-list-template',
  templateUrl: './create-new-task-list-template.component.html',
  styleUrls: ['./create-new-task-list-template.component.css']
})
export class CreateNewTaskListTemplateComponent {



  taskListName: string = ''; // task List Name
  tasks: { name: string, time: string , reminders: string, anynote: string}[] = [{ name: '', time: '', reminders:'', anynote:'' }]; // tasks array

  tableData: { name: string, time: string, reminders:string, anynote: string }[] = [];
  submittedTaskLists: any[] = [];

  insertRow() {
    this.tableData.push({ name: '', time: '' ,reminders:'', anynote:''});
  }



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



  addDate(index: number) {
    // Implement logic to add date to the specified task list
  }

  updateTaskList(index: number) {
    // Implement logic to update the specified task list
  }

  saveDate(){

  }

  updateData()
  {

  }

  saveDetails()
  {

  }


}

