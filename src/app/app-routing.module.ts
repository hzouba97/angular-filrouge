import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UsersDetailsComponent} from "./components/users-details/users-details.component";
import {PlanningComponent} from "./components/planning/planning.component";
import {AddUsersComponent} from "./components/add-users/add-users.component";

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path:'users', component: UsersListComponent},
  {path:'users/:id', component: UsersDetailsComponent},
  {path:'users/:id/planning', component: PlanningComponent},
  {path:'add-users', component: AddUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
