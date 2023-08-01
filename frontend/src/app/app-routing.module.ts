import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {PasswordComponent} from "./password/password.component";
import {ForgetPasswordComponent} from "./password/forget-password/forget-password.component";


import {HomeHeaderComponent} from "./home/home-header/home-header.component";
import {BabyDetailsComponent} from "./main/content/parent/baby-details/baby-details.component";
import {ViewBabyDetailsComponent} from "./main/content/parent/view-baby-details/view-baby-details.component";
import {ViewBabySittersComponent} from "./main/content/parent/view-baby-sitters/view-baby-sitters.component";
import {SitterPersonalInformationComponent} from "./main/content/parent/sitter-personal-information/sitter-personal-information.component";

//babysitter
import { BabysitterDashboardComponent } from "./main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component";
import { BabysitterTasklistComponent } from './main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component';
import { BabysitterParentrequestComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-parentrequest.component';
import { BabysitterRequestdetailsComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component';





const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'home-header',
        component: HomeHeaderComponent,
      },
    ]
  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'signup',
    component:SignupComponent,
  },
  {
    path: 'password',
    component:PasswordComponent,
    children: [
      {
        path: 'forget-password',
        component: ForgetPasswordComponent,
      },
    ]
  },

  {
    path: 'main',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'parent_dashboard',
        component: ParentDashboardComponent

      },
      {
        path: 'baby_details',
        component: BabyDetailsComponent

      },
      {
        path: 'view_baby_details',
        component: ViewBabyDetailsComponent
      },
      {
        path: 'view_baby_sitters',
        component: ViewBabySittersComponent
      },
      {
        path: 'sitter_personal_information',
        component: SitterPersonalInformationComponent
      },
      //babysitter
      {
        path: 'babysitter_dashboard',
        component: BabysitterDashboardComponent
      },
      {
        path: 'babysitter_tasklist',
        component: BabysitterTasklistComponent,
      },
      {
        path: 'babysitter_parentrequest',
        component: BabysitterParentrequestComponent,
      },
      {
        path: 'babysitter_requestdetails',
        component: BabysitterRequestdetailsComponent,
      },
    ]
  }
  ]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
