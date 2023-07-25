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
import { NavDomainExpertComponent } from './main/navbar/nav-domain-expert/nav-domain-expert.component';
import { AdminDashboardComponent } from './main/content/admin/admin-dashboard/admin-dashboard.component';
import { ParentDashboardComponent } from './main/content/parent/parent-dashboard/parent-dashboard.component';
import { DomainExpertDashboardComponent } from './main/content/domain-expert/domain-expert-dashboard/domain-expert-dashboard.component';
import { SignupComponent } from './signup/signup.component';

//babysitter
import { NavBabysitterComponent } from './main/navbar/nav-babysitter/nav-babysitter.component';
import { BabysitterDashboardComponent } from './main/content/babysitter/babysitter-dashboard/babysitter-dashboard.component';
import { BabysitterMyProfileComponent } from './main/content/babysitter/babysitter-my-profile/babysitter-my-profile.component';
import { BabysitterViewRequestComponent } from './main/content/babysitter/babysitter-view-request/babysitter-view-request.component';
import { BabysitterTaskListComponent } from './main/content/babysitter/babysitter-task-list/babysitter-task-list.component';
import { BabysitterChatComponent } from './main/content/babysitter/babysitter-chat/babysitter-chat.component';
import { BabysitterBlogComponent } from './main/content/babysitter/babysitter-blog/babysitter-blog.component';

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
    NavDomainExpertComponent,
    AdminDashboardComponent,
    ParentDashboardComponent,
    DomainExpertDashboardComponent,
    SignupComponent,

    //babysitter
    NavBabysitterComponent,
    BabysitterDashboardComponent,
    BabysitterMyProfileComponent,
    BabysitterViewRequestComponent,
    BabysitterTaskListComponent,
    BabysitterChatComponent,
    BabysitterBlogComponent,

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
