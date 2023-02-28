import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {map, mergeMap} from "rxjs";
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-users-details',
  templateUrl: './users-details.component.html',
  styleUrls: ['./users-details.component.css']
})
export class UsersDetailsComponent implements OnInit {

  user!: User;

  constructor(private usersService: UsersService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.params
      .pipe(
        map(params => params['id']),
        mergeMap((usersId: number) => this.usersService.fetchUsersById(usersId))
      )
      .subscribe((users: User) => {
        this.user = users;
      });

  }

  editUser() {
    this.router.navigate([`/edit-user/${this.user.id}`]);
  }
}
