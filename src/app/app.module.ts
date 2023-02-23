import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FullCalendarModule} from "@fullcalendar/angular";
import { PlanningComponent } from './components/planning/planning.component';
import { AddUsersComponent } from './components/add-users/add-users.component';
import {FormsModule} from "@angular/forms";
import { AddEventsComponent } from './components/add-events/add-events.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersListComponent,
    UsersDetailsComponent,
    PlanningComponent,
    AddUsersComponent,
    AddEventsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        BrowserModule,
        FullCalendarModule,
        FormsModule,


        // register FullCalendar with the app
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
