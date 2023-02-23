import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersDetailsComponent } from './components/users-details/users-details.component';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from "@fullcalendar/angular";
import { PlanningComponent } from './components/planning/planning.component';
import { WeatherApiComponent } from "./components/weather-api/weather-api.component";
import {WeatherService} from "./services/weather.service";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UsersListComponent,
    UsersDetailsComponent,
    PlanningComponent,
    WeatherApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserModule,
    FullCalendarModule // register FullCalendar with the app
  ],
  providers: [
    WeatherService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
