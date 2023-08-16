import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import{ MatTabsModule} from "@angular/material/tabs";
@Component({
  selector: 'app-babysitter-tasklist',
  templateUrl: './babysitter-tasklist.component.html',
  styleUrls: ['./babysitter-tasklist.component.css']
})
export class BabysitterTasklistComponent {

  /* if there is no task list*/
  /*taskArray: any[] = []; */


  taskArray = [
    {
      taskName: 'Brush Teeth',
      time: '',
      get_reminders: false,
      any_special_note: 'Help child brush their teeth before bedtime.',
      completed_status: false
    },
    {
      taskName: 'Brush Teeth',
      time: '',
      get_reminders: false,
      any_special_note: 'Help child brush their teeth before bedtime.',
      completed_status: false
    },
    {
      taskName: 'Brush Teeth',
      time: '',
      get_reminders: false,
      any_special_note: 'Help child brush their teeth before bedtime.',
      completed_status: false
    },
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    console.log(form);

    this.taskArray.push({
      taskName: form.controls['task'].value,
      time: form.controls['time'].value,
      get_reminders: form.controls['get_reminders'].value,
      any_special_note: form.controls['any_special_note'].value,
      completed_status: false
    });

    form.reset(); // Reset the form fields after submission
  }
}
