import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: User[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService
      .fetchUsers()
      .subscribe(data => {
        this.users = data
      });

  }


}
