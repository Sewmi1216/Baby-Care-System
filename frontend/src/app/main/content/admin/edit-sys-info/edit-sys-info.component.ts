import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from "../../../../service/admin.service";
import {NgToastService} from "ng-angular-popup";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-edit-sys-info',
  templateUrl: './edit-sys-info.component.html',
  styleUrls: ['./edit-sys-info.component.css']
})
export class EditSysInfoComponent {

  sytemInfoArray : sytemInfoArray[]=[];

  currentInfoID = ''

  about: string ="";
  goals: string ="";
  service: string ="";
  vision: string ="";
  team: string ="";
  thank: string ="";
  


  constructor(
    private adminService: AdminService, private toast: NgToastService, private router:Router,private cookieService: CookieService,private http:HttpClient
  ) {}

    ngOnInit(): void {
      
       this.getSysteminfo();
     }
    
     getSysteminfo() {
      // @ts-ignore
      this.adminService.getSystemInfo(JSON.parse(localStorage.getItem('user'))).subscribe(
        (response) => {
          this.sytemInfoArray = response.information; 

          console.log(this.sytemInfoArray);
        },
        (error) => {
          console.log(localStorage.getItem('user'))
        }
      );
    }




    setUpdate(data:any){
      this.about = data.about;

      this.currentInfoID = data.id;

    }

    UpdateRecords(){
      let BodyData = {
        "about":this.about,
        "goals":this.goals,
        "service": this.service,
        "vision":this.vision,
        "team":this.team,
        "thank":this.thank,
      };

      this.http.put("http://localhost:8070/admin/updateSystemInfo"+"/"+this.currentInfoID,BodyData).subscribe((res: any)=>{
        console.log(res);
        alert("Info Updated")
      });

    }

    save(){
      this.currentInfoID == '';
    }

}

interface sytemInfoArray{
  id: string;
  about: string;
  goals: string;
  service: string;
  vision: string;
  team: string;
  thank: string;
  }

