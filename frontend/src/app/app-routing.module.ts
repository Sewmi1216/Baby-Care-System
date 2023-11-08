import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {MainComponent} from "./main/main.component";
import {ParentDashboardComponent} from "./main/content/parent/parent-dashboard/parent-dashboard.component";
import {SignupComponent} from "./signup/signup.component";
import {RequestedBabysittersComponent} from "./main/content/parent/requested-babysitters/requested-babysitters.component";
import {TaskListComponent} from "./main/content/parent/task-list/task-list.component";
import {ForgetPasswordComponent} from "./password/forget-password/forget-password.component";

/* babysitter */
import {
  BabysitterDashboardComponent
} from "./main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component";
import {BabysitterTasklistComponent} from './main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component';
// import {
//   BabysitterParentrequestComponent
// } from './main/content/babysitter/babysitter-parentrequest/babysitter-parentrequest.component';
// import {BabysitterRequestdetailsComponent} from './main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component';
import {BabysitterChatComponent} from './main/content/babysitter/babysitter-chat/babysitter-chat.component';


import {HomeHeaderComponent} from "./home/home-header/home-header.component";
import {BabyDetailsComponent} from "./main/content/parent/baby-details/baby-details.component";
import {ViewBabyDetailsComponent} from "./main/content/parent/view-baby-details/view-baby-details.component";
import {ViewBabySittersComponent} from "./main/content/parent/view-baby-sitters/view-baby-sitters.component";
import {
  SitterPersonalInformationComponent
} from "./main/content/parent/sitter-personal-information/sitter-personal-information.component";
import {
  DomainExpertProfileComponent
} from "./main/content/domain-expert/domain-expert-profile/domain-expert-profile.component";

import {ParentMyPlanComponent} from "./main/content/parent/parent-my-plan/parent-my-plan.component";
import {ParentProfileComponent} from "./main/content/parent/parent-profile/parent-profile.component";
import {MyBabysitterComponent} from "./main/content/parent/my-babysitter/my-babysitter.component";

//domain-expert
import {
  DomainExpertDashboardComponent
} from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import {
  DomainExpertModerateCommunityComponent
} from './main/content/domain-expert/domain-expert-moderate-community/domain-expert-moderate-community.component';



//import {ModerateCommunityComponent} from "./main/content/domain-expert/moderate-community/moderate-community.component";

import {LiveStreamComponent} from "./main/content/parent/live-stream/live-stream.component";


/* Admin */
import { AdminDashboardComponent } from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import { ManageUserAccountsComponent } from "./main/content/admin/manage-user-accounts/manage-user-accounts.component";
import { VerifyBabysittersComponent } from "./main/content/admin/verify-babysitters/verify-babysitters.component";
import { EditSysInfoComponent } from "./main/content/admin/edit-sys-info/edit-sys-info.component";
import { HandleComplaintsComponent } from "./main/content/admin/handle-complaints/handle-complaints.component";
import { HandlePaymentComponent } from "./main/content/admin/handle-payment/handle-payment.component";

import { TaskListHomeComponent } from "./main/content/parent/task-list-home/task-list-home.component";
import { ViewNewParentsComponent  } from "./main/content/admin/view-new-parents/view-new-parents.component";
import { ViewNewBabysittersComponent } from "./main/content/admin/view-new-babysitters/view-new-babysitters.component";

import {ViewBabysitterVerifyComponent} from "./main/content/admin/view-babysitter-verify/view-babysitter-verify.component";


import {babysitterGuard} from "./guard/babysitter.guard";
import {adminGuard} from "./guard/admin.guard";
import {domainExpertGuard} from "./guard/domain-expert.guard";

import {BabyGrowthComponent} from "./main/content/parent/baby-growth/baby-growth.component";

import {VaccinationDetailsComponent} from "./main/content/parent/vaccination-details/vaccination-details.component";
import {GrowthParametersComponent} from "./main/content/parent/growth-parameters/growth-parameters.component";
import {
  HandleComplaintsViewMoreComponent
} from "./main/content/admin/handle-complaints/handle-complaints-view-more/handle-complaints-view-more.component";

 import{PendingBabysitterListComponent} from "./main/content/admin/pending-babysitter-list/pending-babysitter-list.component";
import {
  CommunityDiscussionForumComponent
} from "./main/content/parent/community-discussion-forum/community-discussion-forum.component";


import {ParentSignupComponent} from "./signup/parent-signup/parent-signup.component";
import {BabysitterSignupComponent} from "./signup/babysitter-signup/babysitter-signup.component";

import {CompliantsComponent} from "./main/content/parent/compliants/compliants.component";
import {AboutUsComponent} from "./about-us/about-us.component";

import {ModerateForumComponent} from "./main/content/domain-expert/moderate-forum/moderate-forum.component";

import {
  CreateNewTaskListTemplateComponent
} from "./main/content/parent/task-list-home/create-new-task-list-template/create-new-task-list-template.component";
import { BabysitterViewParentRequestsComponent } from "./main/content/babysitter/babysitter-view-parent-requests/babysitter-view-parent-requests.component";
import {
  BabysitterViewMoreParentRequestsComponent
} from "./main/content/babysitter/babysitter-view-parent-requests/babysitter-view-more-parent-requests/babysitter-view-more-parent-requests.component";
import {
  ManageBlogsComponent
} from "./main/content/domain-expert/domain-expert-blog/manage-blogs/manage-blogs.component";
import {CreateBlogComponent} from "./main/content/domain-expert/domain-expert-blog/create-blog/create-blog.component";
import {BlogViewComponent} from "./blog/blog-view/blog-view.component";
import {BlogListComponent} from "./blog/blog-list/blog-list.component";

import {AddModeratorComponent} from "./main/content/admin/add-moderator/add-moderator.component";

import { PreviousTaskListsComponent} from "./main/content/parent/task-list-home/previous-task-lists/previous-task-lists.component";
import {
  PreviousBabysitterTaskListMoreComponent
} from "./main/content/babysitter/babysitter-tasklist/previous-babysitter-task-list/previous-babysitter-task-list-more/previous-babysitter-task-list-more.component";
import {
  ManageUserAccountsMoreComponent
} from "./main/content/admin/manage-user-accounts/manage-user-accounts-more/manage-user-accounts-more.component";
import {
  RequestedBabysittersMoreComponent
} from "./main/content/parent/requested-babysitters/requested-babysitters-more/requested-babysitters-more.component";
import {parentGuard} from "./guard/parent.guard";

import {
  TaskListTemplatesComponent
} from "./main/content/parent/task-list-home/task-list-templates/task-list-templates.component";
import {NextTaskListsComponent} from "./main/content/parent/task-list-home/next-task-lists/next-task-lists.component";

import {ContactUsComponent} from "./contact-us/contact-us.component";





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
    path: 'about_us',
    component:AboutUsComponent
  },
  {
    path: 'contact_us',
    component:ContactUsComponent
  },
  {
    path: 'blog_view',
    component:BlogViewComponent
  },
  {
    path: 'blog_list',
    component:BlogListComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'parent_signup',
    component: ParentSignupComponent
  },
  {
    path: 'babysitter_signup',
    component: BabysitterSignupComponent
  },

  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
  },

  {
    path: 'parent',
    component: MainComponent,
    canActivate: [parentGuard],
    children: [
      {
        path: 'parent_dashboard',
        component: ParentDashboardComponent

      },
      {
        path: 'parent_profile/:user_id',
        component: ParentProfileComponent

      },
      {
        path: 'complaints',
        component: CompliantsComponent

      },
      {
        path: 'view_new_parents',
        component: ViewNewParentsComponent
      },
      {
        path: 'view_new_babysitters',
        component: ViewNewBabysittersComponent
      },
      {
        path: 'my_babysitter/:babysitter_id',
        component: MyBabysitterComponent
      },
      {
        path: 'task_list_home',
        component: TaskListHomeComponent

      },
      {
        path: 'parent_task_list',
        component: TaskListComponent
      },
      {
        path: 'create_new_task_list',
        component: CreateNewTaskListTemplateComponent
      },
      {
        path:'task_list_templates',
        component: TaskListTemplatesComponent
      },
      {
        path:'previous_task_lists',
        component: PreviousTaskListsComponent
      },
      {
        path:'next_task_lists',
        component: NextTaskListsComponent
      },
      {
        path: 'baby_details/:parentId',
        component: BabyDetailsComponent
      },
      {
        path: 'live_stream',
        component: LiveStreamComponent
      },
      {
        path: 'view_baby_details/:baby_id',
        component: ViewBabyDetailsComponent
      },
      {
        path: 'baby_growth/:baby_id',
        component: BabyGrowthComponent
      },
      {
        path: 'vaccination_details',
        component: VaccinationDetailsComponent
      },
      {
        path: 'growth_parameters/:baby_id',
        component: GrowthParametersComponent
      },
      {
        path: 'view_baby_sitters',
        component: ViewBabySittersComponent
      },
      {
        path: 'sitter_personal_information/:babysitter_id',
        component: SitterPersonalInformationComponent
      },
      {
        path: 'domain_expert_profile',
        component: DomainExpertProfileComponent

      },

      {
        path: 'requested_babysitters/:parentId',
        component: RequestedBabysittersComponent

      },
      {
        path: 'requested_babysitters_more',
        component: RequestedBabysittersMoreComponent
      },
      {
        path: 'community_discussion_forum',
        component: CommunityDiscussionForumComponent

      },
      {
        path: 'parent_my_plan',
        component: ParentMyPlanComponent

      },

    ]
  },
  {
    path: 'babysitter',
    component: MainComponent,
    canActivate: [babysitterGuard],
    children: [

      //babysitter
      {
        path: 'babysitter_dashboard',
        component: BabysitterDashboardComponent,
      },

      {
        path: 'babysitter_tasklist',
        component: BabysitterTasklistComponent,
      },
      {
        path: 'babysitter_view_parent_request',
        component: BabysitterViewParentRequestsComponent,
      },
      {
        path: 'view_parents_requests',
        component: BabysitterViewParentRequestsComponent
      },
      {
        path: 'view_more_parent_requests/:requestForm_id/:parentName',
        component: BabysitterViewMoreParentRequestsComponent
      },

      // {
      //   path: 'domain_expert_moderate_community',
      //   component: ModerateCommunityComponent,
      // },


      {
        path: 'babysitter_tasklist',
        component: BabysitterTasklistComponent,
      },

      {
        path: 'view_previous_task_list_more',
        component: PreviousBabysitterTaskListMoreComponent
      },

    ]
  },
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [adminGuard],
    children: [
      /* Admin */
      {
        path: 'admin_dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'add_moderator',
        component: AddModeratorComponent,
      },
      {
        path: 'manage_user_accounts',
        component: ManageUserAccountsComponent
      },

      {
        path: 'handle_complaints',
        component: HandleComplaintsComponent

      },
      {
        path: 'verify_babysitter/:id',
        component: VerifyBabysittersComponent
      },
      // {
      //   path: 'view_verify_profile',
      //   component: ViewBabysitterVerifyComponent
      // },
      {
        path: 'edit_sys_info',
        component: EditSysInfoComponent
      },
      {
        path: 'handle_payments',
        component: HandlePaymentComponent
      },
      {
        path: 'handle_complaints',
        component: HandleComplaintsComponent
      },
      {
        path: 'handle_complaints_view_more/:id',
        component: HandleComplaintsViewMoreComponent
      },
      {
        path: 'edit_sys_info',
        component: EditSysInfoComponent
      },
      {
        path: 'pending_babysitter_list',
        component:PendingBabysitterListComponent
      },
      {
        path: 'manage_user_accounts_more',
        component: ManageUserAccountsMoreComponent
      },
      {
        path: 'view_babysitter_verify/:id',
        component: ViewBabysitterVerifyComponent
      },



      // {
      // path: 'domain_expert_moderate_community',
      // component: ModerateCommunityComponent
      // }
    ]
  },
  {
    path: 'domain_expert',
    component: MainComponent,
    canActivate: [domainExpertGuard],
    children: [

      //domain-expert
      {
        path: 'domain_expert_dashboard',
        component: DomainExpertDashboardComponent,
      },
      {
        path: 'domain_expert_moderate_community',
        component: DomainExpertModerateCommunityComponent,
      },

      {
        path: 'manage_blogs',
        component: ManageBlogsComponent,
      },
      {
        path: 'create_blog',
        component: CreateBlogComponent,
      },


      {
        path: 'moderate_forum',
        component: ModerateForumComponent
      },


    ]
  }

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
