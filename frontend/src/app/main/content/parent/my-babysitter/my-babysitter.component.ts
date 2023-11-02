import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParentService } from '../../../../service/parent.service'
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-babysitter',
  templateUrl: './my-babysitter.component.html',
  styleUrls: ['./my-babysitter.component.css']
})

export class MyBabysitterComponent {

  feedbackData = [
    {
      name: "Danushika Wijesinghe",
      rating: 4,
      comment: "Great babysitter! Took good care of our kids.",
      expanded:false
    },
    {

      name: "Tharushi Chethana",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
    {

      name: "Ishini Ekanayake",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
    {

      name: "Nadee Rajapaksha",
      rating: 5,
      comment: "Highly recommend. Very responsible.",
      expanded: false
    },
  ]

  babysitterId: string = ''
  requestForms: any[] = [];
  babysitterProfile = {
    _id: '',
    userId: '',
    age: '',
    gender: '',
    image:'',
    firstName: '',
    lastName: '', 
    email: '',
    phone: '',
    address: '',
    nic: '',
    religon: '',
    language: '',
    startDate: '',
    endDate: '',
    profile: ''
  };

  updateBabysitter = {
    endDate:'',
    extendDate:''
  }

  endDate: string = ''
  extendDate: string = ''
  formattedDate: string = ''
  formattedEndDate: string = ''
  formattedExtendDate: string =''
  babysitterFullName: string | null = null
  image: string = ''

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router:Router, private cookieService: CookieService, private route: ActivatedRoute
  ){}

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
    if (userJSON !== null) {
      this.parentService.getBabysitter(this.babysitterId).subscribe(
        (response)=>{
          this.babysitterProfile = response.babysitter
          console.log(this.babysitterProfile)
          this.image = this.babysitterProfile.profile
          console.log(this.image)
          this.babysitterFullName = `${this.babysitterProfile.firstName} ${this.babysitterProfile.lastName}`;
          const date = new Date(this.babysitterProfile.startDate);
          this.formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
          const endDate = new Date(this.babysitterProfile.endDate);
          this.formattedEndDate = `${endDate.getFullYear()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')}`;
          console.log(this.babysitterProfile._id)
          console.log(this.formattedEndDate)
        },
        (error)=>{

        }
      )
    }
  }

  updateDates(babysitterId:any){ 
    console.log(babysitterId)
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      if(this.extendDate){
        this.updateBabysitter.endDate = this.extendDate
      }
      else if(!this.extendDate){
        this.updateBabysitter.endDate = this.endDate
      }
      console.log(this.updateBabysitter)
      this.parentService.updateDates(this.updateBabysitter, this.babysitterId).subscribe(
        (data) => {
          console.log("update babysitter successful:", data);
          this.toast.success({detail:"SUCCESS",summary:'Update work date and extend date', position:'topCenter'});
          console.log("Successfully");
          location.reload();
        },
        (err) => {
          this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
  }

 deleteBabysitter(babysitterId:any){ 
    console.log(babysitterId)
    const userJSON = localStorage.getItem('user');
    if (userJSON !== null) {
      const userObject = JSON.parse(userJSON);
      const parentId = userObject.id;
      console.log(parentId)
      this.parentService.deleteBabysitter(this.babysitterId, parentId).subscribe(
        (data) => {
          console.log(data);
          console.log("update babysitter successful:", data);
          this.toast.success({detail:"SUCCESS",summary:'Successfully remove babysitter', position:'topCenter'});
          console.log("Successfully");
          this.router.navigate(['/parent/parent_dashboard']);
          // this.deleteRequestFormID();
          // this.deleteRequestForm();
          
        },
        (err) => {
          this.toast.error({detail:"ERROR",summary:err.error.message, position:'topCenter'});
          console.log(`unsuccessful requestForm:${err}`, err);
        }
      )
    }
  }   

  // deleteRequestFormID() {
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     const userObject = JSON.parse(userJSON);
  //     const parentId = userObject.id;
  //     this.parentService.deleteRequestFormID(this.babysitterId, parentId).subscribe(
  //       (response) => {
  //         this.requestForms = response.requestForms; // get all requestForms
  //         console.log(this.requestForms)
  //       },
  //       (error) => {
  //         console.log(localStorage.getItem('user'))
  //         console.error('Error fetching requestForms:', error);
  //       }
  //     )
  //   }
  // }

  // deleteRequestForm(){
  //   const userJSON = localStorage.getItem('user');
  //   if (userJSON !== null) {
  //     this.parentService.getRequestForms(JSON.parse(userJSON)).subscribe(
  //       (response) => {
  //         this.requestForms = response.requestForms; // get all requestForms
  //         console.log(this.requestForms)
  //       },
  //       (error) => {
  //         console.log(localStorage.getItem('user'))
  //         console.error('Error fetching requestForms:', error);
  //       }
  //     )
  //   }
  // }

  toggleExpand(feedback: any): void {
    feedback.expanded = !feedback.expanded;
  }
}
