import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UsersDetailsComponent} from "./components/users-details/users-details.component";
import {PlanningComponent} from "./components/planning/planning.component";
import {WeatherApiComponent} from "./components/weather-api/weather-api.component";
import {AddUsersComponent} from "./components/add-users/add-users.component";
import {AddEventsComponent} from "./components/add-events/add-events.component";


const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path:'users', component: UsersListComponent},
  {path:'users/weather', component: WeatherApiComponent},
  {path:'users/:id', component: UsersDetailsComponent},
  {path:'users/:id/planning', component: PlanningComponent},
  {path:'add-users', component: AddUsersComponent},
  {path:'add-event', component: AddEventsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
