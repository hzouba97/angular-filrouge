import { Component } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {Users} from "../../models/users";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
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
    phoneNumber: '',
  };

  


  constructor(private usersService:UsersService, private router: Router) {
  }

  updateUser(){
    this.usersService
      .editUser(this.users)
      .subscribe(ok => {alert('ok')})
    this.router.navigate(['users']);
  }


}
