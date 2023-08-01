import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { NavBabysitterComponent } from './main/navbar/nav-babysitter/nav-babysitter.component';
import { NavDomainExpertComponent } from './main/navbar/nav-domain-expert/nav-domain-expert.component';
import { AdminDashboardComponent } from './main/content/admin/admin-dashboard/admin-dashboard.component';
import { ParentDashboardComponent } from './main/content/parent/parent-dashboard/parent-dashboard.component';
import { BabysitterDashboardComponent } from './main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component';
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { SignupComponent } from './signup/signup.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { BabyDetailsComponent } from './main/content/parent/baby-details/baby-details.component';
import { ViewBabyDetailsComponent } from './main/content/parent/view-baby-details/view-baby-details.component';
import { ViewBabySittersComponent } from './main/content/parent/view-baby-sitters/view-baby-sitters.component';
import { SitterPersonalInformationComponent } from './main/content/parent/sitter-personal-information/sitter-personal-information.component';
import { DomainExpertProfileComponent } from './main/content/domain-expert/domain-expert-profile/domain-expert-profile.component';
import { ModerateBlogComponent } from './main/content/domain-expert/moderate-blog/moderate-blog.component';
import { ModerateCommunityComponent } from './main/content/domain-expert/moderate-community/moderate-community.component';
import {BabysitterTasklistComponent} from "./main/content/babysitter/babysitter-tasklist/babysitter-tasklist.component";
import {BabysitterParentrequestComponent} from "./main/content/babysitter/babysitter-parentrequest/babysitter-parentrequest.component";
import {BabysitterRequestdetailsComponent} from "./main/content/babysitter/babysitter-parentrequest/babysitter-requestdetails/babysitter-requestdetails.component";
import { ParentMyPlanComponent } from './main/content/parent/parent-my-plan/parent-my-plan.component';
import { ParentProfileComponent } from './main/content/parent/parent-profile/parent-profile.component';

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
    AdminDashboardComponent,
    ParentDashboardComponent,
    BabysitterDashboardComponent,
    DomainExpertDashboardComponent,
    SignupComponent,

    BabyDetailsComponent,
     ViewBabyDetailsComponent,
     ViewBabySittersComponent,
     SitterPersonalInformationComponent,
     DomainExpertProfileComponent,
     ModerateBlogComponent,
     ModerateCommunityComponent,


    HomeHeaderComponent,


    //babysitter
    NavBabysitterComponent,
    BabysitterDashboardComponent,
    BabysitterTasklistComponent,
    BabysitterParentrequestComponent,
    BabysitterRequestdetailsComponent,
    ParentMyPlanComponent,
    ParentProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
