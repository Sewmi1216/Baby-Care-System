import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../../../service/auth.service";
import {NgToastService} from "ng-angular-popup";
import {ParentService} from "../../../../service/parent.service";
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-compliants',
  templateUrl: './compliants.component.html',
  styleUrls: ['./compliants.component.css']
})
export class CompliantsComponent  {
  @ViewChild('addPaymentForm', { static: true }) public addPaymentForm!: NgForm;

  complaints:any[]=[];
  complaint={
    id:'',
    type:'',
    description:''
  };
  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router,private cookieService: CookieService
  ) {}
 onSubmit(){
   // @ts-ignore
   const userId= JSON.parse(localStorage.getItem('user')).id
   const formdata = new FormData()
   formdata.append('userId', userId);
   formdata.append('type', this.complaint.type);
   formdata.append('description', this.complaint.description);
  // console.log(formdata);
   this.parentService.addComplaint(formdata).subscribe(
     (data) => {
       this.router.navigate(['/parent/complaints'])
       this.toast.success({detail:"SUCCESS",summary:'Complaint added successfully', position:'topCenter'});
       console.log("Complaint added successful:", data);

     },
     (err) => {
       this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
       console.log(`unsuccessful Complaint:${err}`, err);
     }
   );
 }




}





