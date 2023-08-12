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
import { NavAdminComponent } from './main/navbar/nav-admin/nav-admin.component';
import { NavDomainExpertComponent } from './main/navbar/nav-domain-expert/nav-domain-expert.component';
import { ParentDashboardComponent } from './main/content/parent/parent-dashboard/parent-dashboard.component';

import { SignupComponent } from './signup/signup.component';
import { TaskListComponent } from './main/content/parent/task-list/task-list.component';
import { SearchBabysittersComponent } from './main/content/parent/search-babysitters/search-babysitters.component';
import { LiveStreamComponent } from './main/content/parent/live-stream/live-stream.component';
import { CommunityComponent } from './main/content/parent/community/community.component';
import { FormsModule} from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  /* import form module */
import { NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { ParentdashLeftContentComponent } from './main/content/parent/parent-dashboard/parentdash-left-content/parentdash-left-content.component';
import { ParentdashRightContentComponent } from './main/content/parent/parent-dashboard/parentdash-right-content/parentdash-right-content.component';
import { ParentdashTopContentComponent } from './main/content/parent/parent-dashboard/parentdash-top-content/parentdash-top-content.component';

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
import { NavBabysitterComponent } from './main/navbar/nav-babysitter/nav-babysitter.component';
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

//domain-expert
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { DomainExpertModerateCommunityComponent } from './main/content/domain-expert/domain-expert-moderate-community/domain-expert-moderate-community.component';
import { DomainExpertModerateBlogComponent } from './main/content/domain-expert/domain-expert-moderate-blog/domain-expert-moderate-blog.component';

//import { ModerateBlogComponent } from './main/content/domain-expert/moderate-blog/moderate-blog.component';
//import { ModerateCommunityComponent } from './main/content/domain-expert/moderate-community/moderate-community.component';


import { ForgetPasswordComponent } from './password/forget-password/forget-password.component';


/*Admin Components*/
import {AdminDashboardComponent} from "./main/content/admin/admin-dashboard/admin-dashboard.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import { ManageUserAccountsComponent } from './main/content/admin/manage-user-accounts/manage-user-accounts.component';
import { VerifyBabysittersComponent } from './main/content/admin/verify-babysitters/verify-babysitters.component';

import {NotifierService} from "angular-notifier";

import { BabyGrowthComponent } from './main/content/parent/baby-growth/baby-growth.component';
import { VaccinationDetailsComponent } from './main/content/parent/vaccination-details/vaccination-details.component';





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
    ParentdashLeftContentComponent,
    ParentdashRightContentComponent,
    ParentdashTopContentComponent,
     DomainExpertProfileComponent,

    HomeHeaderComponent,
    /*babysitter*/
    NavBabysitterComponent,
    BabysitterDashboardComponent,
    BabysitterTasklistComponent,
    BabysitterParentrequestComponent,
    BabysitterRequestdetailsComponent,


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
    VaccinationDetailsComponent,



  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule, /*Time picker module*/
    FontAwesomeModule, MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, /*FontAwesome Module*/

    /* import Flex Layout module */
    FlexLayoutModule,
  ],
  providers: [NotifierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
