import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";

//babysitter
import { BabysitterDashboardComponent } from "./main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component";
import { BabysitterMyProfileComponent } from './main/content/babysitter/babysitter-my-profile/babysitter-my-profile.component';
import { BabysitterViewRequestComponent } from './main/content/babysitter/babysitter-view-request/babysitter-view-request.component';
import { BabysitterTaskListComponent } from './main/content/babysitter/babysitter-task-list/babysitter-task-list.component';
import { BabysitterChatComponent } from './main/content/babysitter/babysitter-chat/babysitter-chat.component';
import { BabysitterBlogComponent } from './main/content/babysitter/babysitter-blog/babysitter-blog.component';

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

      //babysitter
      {
        path: 'babysitter_dashboard',
        component: BabysitterDashboardComponent
      },
      {
        path: 'babysitter_my-profile',
        component: BabysitterMyProfileComponent
      },
      {
        path: 'babysitter_view-request',
        component: BabysitterViewRequestComponent,
      },
      {
        path: 'babysitter_task-list',
        component: BabysitterTaskListComponent,
      },
      {
        path: 'babysitter_chat',
        component: BabysitterChatComponent,
      },
      {
        path: 'babysitter_blog',
        component: BabysitterBlogComponent,
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
