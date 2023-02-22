import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Users} from "../../models/users";
import {map, mergeMap} from "rxjs";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  users!: Users;
  constructor(private usersService: UsersService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        map(params => params['id']),
        mergeMap((usersId:number)=> this.usersService.fetchUsersById(usersId))
      )
      .subscribe((users:Users) => {
        this.users = users;
      });

    }
}
