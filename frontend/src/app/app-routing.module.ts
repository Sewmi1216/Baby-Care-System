import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {BabyDetailsComponent} from "./main/content/parent/baby-details/baby-details.component";
import {ViewBabyDetailsComponent} from "./main/content/parent/view-baby-details/view-baby-details.component";
import {ViewBabySittersComponent} from "./main/content/parent/view-baby-sitters/view-baby-sitters.component";
import {SitterPersonalInformationComponent} from "./main/content/parent/sitter-personal-information/sitter-personal-information.component";
import {DomainExpertDashboardComponent} from "./main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component";
import {ModerateBlogComponent} from "./main/content/domain-expert/moderate-blog/moderate-blog.component";
import {DomainExpertProfileComponent} from "./main/content/domain-expert/domain-expert-profile/domain-expert-profile.component";
import {ModerateCommunityComponent} from "./main/content/domain-expert/moderate-community/moderate-community.component";

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
      {
        path: 'domain_expert_dashboard',
        component: DomainExpertDashboardComponent

      },
      {
        path: 'domain_expert_moderate_blogs',
        component: ModerateBlogComponent

      },
      {
        path: 'domain_expert_profile',
        component: DomainExpertProfileComponent

      },
      {
        path: 'domain_expert_moderate_community',
        component: ModerateCommunityComponent

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
