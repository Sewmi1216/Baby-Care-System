import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import { ViewRequestComponent } from './main/content/babysitter/view-request/view-request.component';
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'babysitter-view-request',
    component: ViewRequestComponent,
  },
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'signup',
    component:SignupComponent,
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
    ]
  }
  ]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
