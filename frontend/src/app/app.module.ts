import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import {RouterOutlet} from "@angular/router";
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ContentComponent } from './main/content/content.component';
import { NavbarComponent } from './main/navbar/navbar.component';
import { NavParentComponent } from './main/navbar/nav-parent/nav-parent.component';

//import { NavAdminComponent } from './main/navbar/nav-admin/nav-admin.component';
import { NavAdminComponent} from "./main/navbar/nav-admin/nav-admin.component";
import { NavDomainExpertComponent } from './main/navbar/nav-domain-expert/nav-domain-expert.component';
import { ParentDashboardComponent } from './main/content/parent/parent-dashboard/parent-dashboard.component';

import { SignupComponent } from './signup/signup.component';
import { TaskListComponent } from './main/content/parent/task-list/task-list.component';
import { SearchBabysittersComponent } from './main/content/parent/search-babysitters/search-babysitters.component';
//import { LiveStreamComponent } from './main/content/parent/live-stream/live-stream.component';
import { CommunityComponent } from './main/content/parent/community/community.component';
import { FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  /* import form module */
import { NgxMaterialTimepickerModule} from "ngx-material-timepicker";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

import { library } from '@fortawesome/fontawesome-svg-core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

library.add(faLocation); /*import the faLocation icon*/
import { HomeHeaderComponent } from './home/home-header/home-header.component';



//babysitter
import { BabysitterDashboardComponent } from './main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component';

import { BabysitterChatComponent } from './main/content/babysitter/babysitter-chat/babysitter-chat.component';


import { BabyDetailsComponent } from './main/content/parent/baby-details/baby-details.component';
import { ViewBabyDetailsComponent } from './main/content/parent/view-baby-details/view-baby-details.component';
import { ViewBabySittersComponent } from './main/content/parent/view-baby-sitters/view-baby-sitters.component';
import { SitterPersonalInformationComponent } from './main/content/parent/sitter-personal-information/sitter-personal-information.component';
import { DomainExpertProfileComponent } from './main/content/domain-expert/domain-expert-profile/domain-expert-profile.component';
import { ParentMyPlanComponent } from './main/content/parent/parent-my-plan/parent-my-plan.component';
import { ParentProfileComponent } from './main/content/parent/parent-profile/parent-profile.component';
import { MyBabysitterComponent } from './main/content/parent/my-babysitter/my-babysitter.component';

//import { Next } from './main/content/parent/task-list-home/next-task-lists.component'


//domain-expert
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { DomainExpertModerateCommunityComponent } from './main/content/domain-expert/domain-expert-moderate-community/domain-expert-moderate-community.component';


//import { ModerateBlogComponent } from './main/content/domain-expert/moderate-blog/moderate-blog.component';
//import { ModerateCommunityComponent } from './main/content/domain-expert/moderate-community/moderate-community.component';
import { LiveStreamComponent } from './main/content/parent/live-stream/live-stream.component';



import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';


/*Admin Components*/
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ManageUserAccountsComponent } from './main/content/admin/manage-user-accounts/manage-user-accounts.component';
import { VerifyBabysittersComponent } from './main/content/admin/verify-babysitters/verify-babysitters.component';
//import { AdminDashboardUserChartsComponent } from './main/content/admin/admin-dashboard/admin-dashboard-user-charts/admin-dashboard-user-charts.component';
import { HandlePaymentComponent } from './main/content/admin/handle-payment/handle-payment.component';
import { HandleComplaintsComponent } from './main/content/admin/handle-complaints/handle-complaints.component';
import { EditSysInfoComponent } from './main/content/admin/edit-sys-info/edit-sys-info.component';
import { ViewBabysitterVerifyComponent } from './main/content/admin/view-babysitter-verify/view-babysitter-verify.component';




/*Add API reference for Angular Material Components */


import {NotifierModule} from "angular-notifier";

import {MatDatepickerModule} from "@angular/material/datepicker";/*MatDatePickerModule-Date Picker*/
import {MatNativeDateModule} from "@angular/material/core";/*MatNativeDateModule-Date picker*/


// import {NotifierService} from "angular-notifier";

import { BabyGrowthComponent } from './main/content/parent/baby-growth/baby-growth.component';
import { VaccinationDetailsComponent } from './main/content/parent/vaccination-details/vaccination-details.component';
import { GrowthParametersComponent } from './main/content/parent/growth-parameters/growth-parameters.component';

import { MatTabsModule } from '@angular/material/tabs';
import { RequestedBabysittersComponent } from './main/content/parent/requested-babysitters/requested-babysitters.component';
import {NotifierService} from "angular-notifier";

// import { BabyGrowthComponent } from './main/content/parent/baby-growth/baby-growth.component';
import { ParentSignupComponent } from './signup/parent-signup/parent-signup.component';
import { BabysitterSignupComponent } from './signup/babysitter-signup/babysitter-signup.component';
import {NgToastModule} from "ng-angular-popup";
import { EmailValidatorDirective } from './validator/email-validator.directive';
import { TextValidatorDirective } from './validator/text-validator.directive';
import { NicValidatorDirective } from './validator/nic-validator.directive';
import { PhoneValidatorDirective } from './validator/phone-validator.directive';

//import {ChartModule, HIGHCHARTS_MODULES} from "angular-highcharts";
//import { AdminDasboardIncomeChartsComponent } from './main/content/admin/admin-dashboard/admin-dasboard-income-charts/admin-dasboard-income-charts.component';
/* ngx-charts modules */
//import {NgxChartsModule} from "@swimlane/ngx-charts";

//import { AdminDashboardUserPieChartComponent } from './main/content/admin/admin-dashboard/admin-dashboard-user-pie-chart/admin-dashboard-user-pie-chart.component';


import { TaskListHomeComponent } from './main/content/parent/task-list-home/task-list-home.component';
import { ViewNewParentsComponent } from './main/content/admin/view-new-parents/view-new-parents.component';
import { ViewNewBabysittersComponent } from './main/content/admin/view-new-babysitters/view-new-babysitters.component';

// import {NavBabysitterComponent} from "./main/navbar/nav-babysitter/nav-babysitter.component";

import {NavBabysitterComponent} from "./main/navbar/nav-babysitter/nav-babysitter.component";

import { HandleComplaintsViewMoreComponent } from './main/content/admin/handle-complaints/handle-complaints-view-more/handle-complaints-view-more.component';
import {StatusFilterPipe} from "./main/content/admin/manage-user-accounts/manage-user-accounts.pipe";

import { CreateNewTaskListTemplateComponent } from './main/content/parent/task-list-home/create-new-task-list-template/create-new-task-list-template.component';
//import { ParentCalenderComponent } from './main/content/parent/parent-dashboard/parent-calender/parent-calender.component';

import { BsDatepickerModule} from "ngx-bootstrap/datepicker";
//import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import {
//   BabysitterRequestdetailsComponent
// } from "./main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component";


//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
//import { BabysitterViewParentRequestsComponent } from './main/content/babysitter/babysitter-view-parent-requests/babysitter-view-parent-requests.component';
// import { BabysitterViewMoreParentRequestsComponent } from './main/content/babysitter/babysitter-view-parent-requests/babysitter-view-more-parent-requests/babysitter-view-more-parent-requests.component';


import { PendingBabysitterListComponent } from './main/content/admin/pending-babysitter-list/pending-babysitter-list.component';
import { CommunityDiscussionForumComponent } from './main/content/parent/community-discussion-forum/community-discussion-forum.component';

import { CompliantsComponent } from './main/content/parent/compliants/compliants.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ModerateForumComponent } from './main/content/domain-expert/moderate-forum/moderate-forum.component';
import {BabysitterTasklistComponent} from "./main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component";
import { ManageBlogsComponent } from './main/content/domain-expert/domain-expert-blog/manage-blogs/manage-blogs.component';
import { CreateBlogComponent } from './main/content/domain-expert/domain-expert-blog/create-blog/create-blog.component';
import { BlogViewComponent } from './blog/blog-view/blog-view.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import {
  BabysitterViewMoreParentRequestsComponent
} from "./main/content/babysitter/babysitter-view-parent-requests/babysitter-view-more-parent-requests/babysitter-view-more-parent-requests.component";
import { AddModeratorComponent } from './main/content/admin/add-moderator/add-moderator.component';

//import { PreviosTaskListsComponent } from './main/content/parent/task-list-home/previous-task-lists/previos-task-lists.component';
//import {NextTaskListstComponent} from "./main/content/parent/task-list-home/next-task-lists/next-task-listst.component";
import { NextTaskListsComponent } from './main/content/parent/task-list-home/next-task-lists/next-task-lists.component';
import { TodayTaskListComponent } from './main/content/babysitter/babysitter-tasklist/today-task-list/today-task-list.component';
//import { PreviousTaskListComponent} from "./main/content/babysitter/babysitter-tasklist/previous-babysitter-task-list/previous-task-list.component";
import {
  BabysitterViewParentRequestsComponent
} from "./main/content/babysitter/babysitter-view-parent-requests/babysitter-view-parent-requests.component";
import { PreviousBabysitterTaskListMoreComponent } from './main/content/babysitter/babysitter-tasklist/previous-babysitter-task-list/previous-babysitter-task-list-more/previous-babysitter-task-list-more.component';
import { ManageUserAccountsMoreComponent } from './main/content/admin/manage-user-accounts/manage-user-accounts-more/manage-user-accounts-more.component';
import { RequestedBabysittersMoreComponent } from './main/content/parent/requested-babysitters/requested-babysitters-more/requested-babysitters-more.component';

//import { TokenInterceptor} from "./interceptor/token.interceptor";
//import { CreateTaskListComponent } from './main/content/parent/task-list-home/create-task-list/create-task-list.component';
import { TaskListTemplatesComponent } from './main/content/parent/task-list-home/task-list-templates/task-list-templates.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import { PreviousTaskListsComponent } from './main/content/parent/task-list-home/previous-task-lists/previous-task-lists.component';
//import { CreateNewTaskListComponent } from './main/content/parent/task-list-home/create-new-task-list/create-new-task-list.component';

import {TokenInterceptor} from "./interceptor/token.interceptor";
import { ReactiveFormsModule } from '@angular/forms';

import { PaymentComponent } from './main/content/parent/payment/payment.component';
import { ContactUsComponent } from './contact-us/contact-us.component';



@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    MainComponent,
    ContentComponent,
    NavbarComponent,
    NavParentComponent,
    NavAdminComponent,
    NavBabysitterComponent,
    NavDomainExpertComponent,
    ParentDashboardComponent,
    SignupComponent,
    ParentSignupComponent,
    BabysitterSignupComponent,
    BabyDetailsComponent,
    BabyGrowthComponent,
    ViewBabyDetailsComponent,
    ViewBabySittersComponent,
    SitterPersonalInformationComponent,
    DomainExpertDashboardComponent,
    SignupComponent,
    TaskListComponent,
    BabyDetailsComponent,
    SearchBabysittersComponent,
    LiveStreamComponent,
    CommunityComponent,
    DomainExpertProfileComponent,
    DomainExpertProfileComponent,
    CompliantsComponent,
    HomeHeaderComponent,
    /*babysitter*/
    //NavBabysitterComponent,
    BabysitterDashboardComponent,
    //BabysitterTasklistComponent,
    //BabysitterParentrequestComponent,
    //BabysitterRequestdetailsComponent,
    ParentMyPlanComponent,
    ParentProfileComponent,
    MyBabysitterComponent,
    BabysitterChatComponent,


    /*Admin*/
    AdminDashboardComponent,
    ManageUserAccountsComponent,
    VerifyBabysittersComponent,
    ForgetPasswordComponent,
    LiveStreamComponent,
    ViewBabysitterVerifyComponent,

    //domain-expert
    DomainExpertDashboardComponent,
    DomainExpertModerateCommunityComponent,
    VaccinationDetailsComponent,
    GrowthParametersComponent,
    ParentSignupComponent,
    BabysitterSignupComponent,
    EmailValidatorDirective,
    TextValidatorDirective,
    NicValidatorDirective,
    PhoneValidatorDirective,

   HandlePaymentComponent,
   HandleComplaintsComponent,
   EditSysInfoComponent,
   TaskListHomeComponent,
   ViewNewParentsComponent,
   ViewNewBabysittersComponent,

    HandlePaymentComponent,
    HandleComplaintsComponent,
    EditSysInfoComponent,
    TaskListHomeComponent,
    ViewNewParentsComponent,
    ViewNewBabysittersComponent,
    HandleComplaintsViewMoreComponent,

    /*for filter*/
    StatusFilterPipe,
    // BabysitterTasklistComponent,
    CreateNewTaskListTemplateComponent,
    // BabysitterViewParentRequestsComponent,
    BabysitterViewMoreParentRequestsComponent,


    RequestedBabysittersComponent,

    PendingBabysitterListComponent,
    //CommunityDiscussionForumComponent,
    //CompliantsComponent,
    //AboutUsComponent,
    //ModerateForumComponent,
    //PreviosTaskListsComponent,
    NextTaskListsComponent,
    //TodayTaskListComponent,
    //PreviousTaskListComponent,
    //PreviosTaskListsComponent,
    //PreviousTaskListComponent,
    BabysitterViewParentRequestsComponent,
    PreviousBabysitterTaskListMoreComponent,
    ManageUserAccountsMoreComponent,
    RequestedBabysittersMoreComponent,
     // PendingBabysitterListComponent,
      CommunityDiscussionForumComponent,
      CompliantsComponent,
      AboutUsComponent,
      ModerateForumComponent,
      BabysitterTasklistComponent,

      ManageBlogsComponent,
      CreateBlogComponent,
      BlogViewComponent,
      BlogListComponent,
      AddModeratorComponent,
    //  CreateTaskListComponent,
      TaskListTemplatesComponent,
    PreviousTaskListsComponent,
    TodayTaskListComponent,
      //CreateNewTaskListComponent
      PaymentComponent,
      ContactUsComponent




  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    NgToastModule,
    NgxMaterialTimepickerModule, /*Time picker module*/
    FontAwesomeModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, /*FontAwesome Module*/
    MatTabsModule,
    /* import Flex Layout module */
    FlexLayoutModule,
    /*imports modules for angular calender */
    MatDatepickerModule,
    MatNativeDateModule,

    MatTabsModule,
    /*chats module*/
    // ChartModule,
    /* ngx-chart module*/
    //NgxChartsModule
    BsDatepickerModule.forRoot(), FormsModule,
    MatDialogModule, MatInputModule


  ],
  providers: [{
    provide :HTTP_INTERCEPTORS,
    useClass:TokenInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class YourModule { }
