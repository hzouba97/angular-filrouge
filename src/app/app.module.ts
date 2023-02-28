import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {UsersListComponent} from './components/users-list/users-list.component';
import {UsersDetailsComponent} from './components/users-details/users-details.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FullCalendarModule} from "@fullcalendar/angular";
import {PlanningComponent} from './components/planning/planning.component';
import {WeatherApiComponent} from "./components/weather-api/weather-api.component";
import {AddUsersComponent} from './components/add-users/add-users.component';
import {FormsModule} from "@angular/forms";
import {AddEventsComponent} from './components/add-events/add-events.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {EditEventComponent} from './components/edit-event/edit-event.component';
import {EventDetailsComponent} from './components/event-details/event-details.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {httpInterceptorProviders} from "../helpers/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersListComponent,
    UsersDetailsComponent,
    PlanningComponent,
    AddUsersComponent,
    AddEventsComponent,
    WeatherApiComponent,
    EditUserComponent,
    EditEventComponent,
    EventDetailsComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    FullCalendarModule,
    FormsModule
    // register FullCalendar with the app
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
