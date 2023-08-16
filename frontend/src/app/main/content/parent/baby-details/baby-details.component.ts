import {Component, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {ParentService} from "../../../../service/parent.service";

@Component({
  selector: 'app-baby-details',
  templateUrl: './baby-details.component.html',
  styleUrls: ['./baby-details.component.css']
})
export class BabyDetailsComponent {
  @ViewChild('userAccountForm', { static: true }) public addBabyForm!: NgForm;

  baby = {
    firstName: '',
    lastName: '',
    age:'',
    gender:'',
    birthDate:'',
    parent:{
      parentId:''
    },
  };

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router
  ) {}

  ngOnInit(): void {

  }


  onSubmit() {
    console.log("Submitting form...");
    this.parentService.addBaby(this.baby).subscribe(
      (data) => {
        this.router.navigate(['/view_baby_details'])
        this.toast.success({detail:"SUCCESS",summary:data.message, position:'topCenter'});
        console.log("Baby added successful:", data);
        console.log("Successfully");
      },
      (err) => {
        this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter', sticky:true});
        console.log(`unsuccessful baby:${err}`, err);
      }
    );
  }
}
