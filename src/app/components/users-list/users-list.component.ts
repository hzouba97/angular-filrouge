import { Component, OnInit } from '@angular/core';
import {Users} from "../../models/users";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users?: Users[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit():void {
    this.usersService
      .fetchUsers()
      .subscribe(data => {
        this.users = data
      });

  }



}
