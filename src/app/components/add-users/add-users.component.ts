import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {
  users = {
    id: '',
    admin: false,
    username: '',
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    activate: true,
    ville: '',
    gender: '',
    birthdate: '',
    phone: '',
  };

  constructor(private usersService:UsersService, private router: Router) {
  }

  addUsers(){
    this.usersService
      .createUsers(this.users)
      .subscribe(ok => {alert('ok')})
    this.router.navigate(['users']);
  }

}
