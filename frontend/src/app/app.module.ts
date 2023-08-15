import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { NavBabysitterComponent } from './main/navbar/nav-babysitter/nav-babysitter.component';
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
import { BabysitterTasklistComponent } from './main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component';
import { BabysitterParentrequestComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-parentrequest.component';
import { BabysitterRequestdetailsComponent } from './main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component';
import { BabysitterChatComponent } from './main/content/babysitter/babysitter-chat/babysitter-chat.component';


import { BabyDetailsComponent } from './main/content/parent/baby-details/baby-details.component';
import { ViewBabyDetailsComponent } from './main/content/parent/view-baby-details/view-baby-details.component';
import { ViewBabySittersComponent } from './main/content/parent/view-baby-sitters/view-baby-sitters.component';
import { SitterPersonalInformationComponent } from './main/content/parent/sitter-personal-information/sitter-personal-information.component';
import { DomainExpertProfileComponent } from './main/content/domain-expert/domain-expert-profile/domain-expert-profile.component';
import { ParentMyPlanComponent } from './main/content/parent/parent-my-plan/parent-my-plan.component';
import { ParentProfileComponent } from './main/content/parent/parent-profile/parent-profile.component';
import { MyBabysitterComponent } from './main/content/parent/my-babysitter/my-babysitter.component';


//domain-expert
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { DomainExpertModerateCommunityComponent } from './main/content/domain-expert/domain-expert-moderate-community/domain-expert-moderate-community.component';
import { DomainExpertModerateBlogComponent } from './main/content/domain-expert/domain-expert-moderate-blog/domain-expert-moderate-blog.component';

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



/*Add API reference for Angular Material Components */


import {NotifierModule} from "angular-notifier";

import {MatDatepickerModule} from "@angular/material/datepicker";/*MatDatePickerModule-Date Picker*/
import {MatNativeDateModule} from "@angular/material/core";/*MatNativeDateModule-Date picker*/
import {NotifierService} from "angular-notifier";


import { BabyGrowthComponent } from './main/content/parent/baby-growth/baby-growth.component';
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
import {MatTabsModule} from "@angular/material/tabs";
import { ViewNewParentsComponent } from './main/content/admin/view-new-parents/view-new-parents.component';
import { ViewNewBabysittersComponent } from './main/content/admin/view-new-babysitters/view-new-babysitters.component';

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

    HomeHeaderComponent,
    /*babysitter*/
    NavBabysitterComponent,
    BabysitterDashboardComponent,
    BabysitterTasklistComponent,
    BabysitterParentrequestComponent,
    BabysitterRequestdetailsComponent,
    ParentMyPlanComponent,
    ParentProfileComponent,
    MyBabysitterComponent,
    BabysitterChatComponent,


    /*Admin*/
    AdminDashboardComponent,
    ManageUserAccountsComponent,
    VerifyBabysittersComponent,
    ForgetPasswordComponent,

    BabysitterChatComponent,
    LiveStreamComponent,

    //domain-expert
    DomainExpertDashboardComponent,
    DomainExpertModerateCommunityComponent,
    DomainExpertModerateBlogComponent,
    ParentSignupComponent,
    BabysitterSignupComponent,
    EmailValidatorDirective,
    TextValidatorDirective,
    NicValidatorDirective,
    PhoneValidatorDirective,

   // AdminDasboardIncomeChartsComponent,
   // AdminDashboardUserPieChartComponent,
   // AdminDashboardUserChartsComponent,
   HandlePaymentComponent,
   HandleComplaintsComponent,
   EditSysInfoComponent,
   TaskListHomeComponent,
   ViewNewParentsComponent,
   ViewNewBabysittersComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    NgToastModule,
    NgxMaterialTimepickerModule, /*Time picker module*/
    FontAwesomeModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, /*FontAwesome Module*/
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


  ],
  providers: [NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
