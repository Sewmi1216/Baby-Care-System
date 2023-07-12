import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
import { MainHeaderComponent } from './main/main-header/main-header.component';

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
    MainHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
