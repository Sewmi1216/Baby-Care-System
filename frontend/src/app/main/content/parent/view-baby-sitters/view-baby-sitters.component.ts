import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit, ViewChild} from '@angular/core';
import {ParentService} from "../../../../service/parent.service";
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-baby-sitters',
  templateUrl: './view-baby-sitters.component.html',
  styleUrls: ['./view-baby-sitters.component.css']
})

export class ViewBabySittersComponent implements OnInit{
  babysitters: any[] = [];
  babysitter = {
    age: '',
    gender: '',
    image: '',
  };
  parentId: string = ''

  private userId: any;

  constructor(
    private parentService: ParentService, private toast: NgToastService, private router: Router, private CookieService: CookieService
  ){}

  ngOnInit(): void {
    this.getBabysitters();
  }

  getBabysitters(){
    const userJSON = localStorage.getItem('user');
    if(userJSON!==null){
      this.parentId = JSON.parse(userJSON).id
      console.log(this.parentId)
      this.parentService.getBabysitters(JSON.parse(userJSON)).subscribe(
        (response) => {
          this.babysitters = response.babysitters;
          console.log(this.babysitters)
        },
        (error)=>{
          console.log(localStorage.getItem('user'))
          console.error('Error fetching babysitters:', error);
        }
      )
    }
  }

  filteredBabysitters() {
    return this.babysitters.filter(babysitter => !babysitter.isHired);
  }
}
