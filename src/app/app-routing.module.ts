import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UsersDetailsComponent} from "./components/users-details/users-details.component";
import {PlanningComponent} from "./components/planning/planning.component";
import {WeatherApiComponent} from "./components/weather-api/weather-api.component";
import {AddUsersComponent} from "./components/add-users/add-users.component";
import {AddEventsComponent} from "./components/add-events/add-events.component";
import {EditUserComponent} from "./components/edit-user/edit-user.component";
import {EventDetailsComponent} from "./components/event-details/event-details.component";
import {EditEventComponent} from "./components/edit-event/edit-event.component";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'users', component: UsersListComponent},
  {path:'users/weather/:id', component: WeatherApiComponent},
  {path:'users/:id', component: UsersDetailsComponent},
  {path:'users/:id/planning', component: PlanningComponent},
  {path:'add-users', component: AddUsersComponent},
  {path:'add-event', component: AddEventsComponent},
  {path: 'event-details/:id', component: EventDetailsComponent },
  {path: 'edit-event/:id', component: EditEventComponent },
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
