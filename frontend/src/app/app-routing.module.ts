import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";

import {TaskListComponent} from "./main/content/parent/task-list/task-list.component";
import {ForgetPasswordComponent} from "./password/forget-password/forget-password.component";

/* babysitter */
import { BabysitterDashboardComponent } from "./main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component";
import { BabysitterTasklistComponent } from './main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component';
import { BabysitterParentrequestComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-parentrequest.component';
import { BabysitterRequestdetailsComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component';
import { BabysitterChatComponent } from './main/content/babysitter/babysitter-chat/babysitter-chat.component';


import {HomeHeaderComponent} from "./home/home-header/home-header.component";
import {BabyDetailsComponent} from "./main/content/parent/baby-details/baby-details.component";
import {ViewBabyDetailsComponent} from "./main/content/parent/view-baby-details/view-baby-details.component";
import {ViewBabySittersComponent} from "./main/content/parent/view-baby-sitters/view-baby-sitters.component";
import {SitterPersonalInformationComponent} from "./main/content/parent/sitter-personal-information/sitter-personal-information.component";
import {DomainExpertProfileComponent} from "./main/content/domain-expert/domain-expert-profile/domain-expert-profile.component";

import {ModerateCommunityComponent} from "./main/content/domain-expert/moderate-community/moderate-community.component";
import {ParentMyPlanComponent} from "./main/content/parent/parent-my-plan/parent-my-plan.component";
import {ParentProfileComponent} from "./main/content/parent/parent-profile/parent-profile.component";
import {MyBabysitterComponent} from "./main/content/parent/my-babysitter/my-babysitter.component";



//domain-expert
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { DomainExpertModerateCommunityComponent } from './main/content/domain-expert/domain-expert-moderate-community/domain-expert-moderate-community.component';
import { DomainExpertModerateBlogComponent } from './main/content/domain-expert/domain-expert-moderate-blog/domain-expert-moderate-blog.component';


//import {ModerateCommunityComponent} from "./main/content/domain-expert/moderate-community/moderate-community.component";

import {LiveStreamComponent} from "./main/content/parent/live-stream/live-stream.component";



/* Admin */
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {ManageUserAccountsComponent} from "./main/content/admin/manage-user-accounts/manage-user-accounts.component";
import {VerifyBabysittersComponent} from "./main/content/admin/verify-babysitters/verify-babysitters.component";





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
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },

  {
    path: 'main',
    component: MainComponent,
    children: [

      {
        path: 'parent_dashboard',
        component: ParentDashboardComponent

      },
      {
        path:'parent_task_list',
        component: TaskListComponent
      },
      {

        path: 'baby_details',
        component: BabyDetailsComponent

      },
      {
        path: 'live_stream',
        component: LiveStreamComponent

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
      {
        path: 'domain_expert_profile',
        component: DomainExpertProfileComponent

      },

      //babysitter
      {
        path: 'babysitter_dashboard',
        component: BabysitterDashboardComponent,
      },
      {
        path: 'babysitter_parentrequest',
        component: BabysitterParentrequestComponent,
      },
      {
        path: 'babysitter_tasklist',
        component:  BabysitterTasklistComponent,
      },
      {
        path: 'babysitter_requestdetails',
        component: BabysitterRequestdetailsComponent,
      },

      // {
      //   path: 'domain_expert_moderate_community',
      //   component: ModerateCommunityComponent,
      // },


      //babysitter
      {
        path: 'babysitter_dashboard',
        component: BabysitterDashboardComponent,
      },
      {
        path: 'babysitter_parentrequest',
        component: BabysitterParentrequestComponent,
      },
      {
        path: 'babysitter_tasklist',
        component:  BabysitterTasklistComponent,
      },
      {
        path: 'babysitter_requestdetails',
        component: BabysitterRequestdetailsComponent,
      },
      /* Admin */
      {
        path: 'admin_dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'manage_user_accounts',
        component: ManageUserAccountsComponent
      },
      {
        path: 'verify_babysitter',
        component: VerifyBabysittersComponent
      },
      {
        path: 'babysitter_chat',
        component: BabysitterChatComponent,
      },
      // {
         // path: 'domain_expert_moderate_community',
         // component: ModerateCommunityComponent
      // }

      //domain-expert
      {
        path: 'domain_expert_dashboard',
        component: DomainExpertDashboardComponent,
      },
      {
        path: 'domain_expert_moderate_blogs',
        component: DomainExpertModerateBlogComponent,
      },
      {
        path: 'domain_expert_moderate_community',
        component: DomainExpertModerateCommunityComponent,
      },
      {
        path: 'parent_my_plan',
        component:ParentMyPlanComponent

      },
      {
        path: 'parent_profile',
        component:ParentProfileComponent

      },
      {
        path: 'my_babysitter',
        component:MyBabysitterComponent

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
