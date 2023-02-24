import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../services/users.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Users } from "../../models/users";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: Users = {
    id: 7,
    admin: false,
    username: '',
    firstname: '',
    lastname: '',
    mail: '',
    password: '',
    activate: false,
    ville: '',
    gender: '',
    birthdate: '',
    phoneNumber: ''
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usersService.fetchUsersById(Number(id)).subscribe(user => {
      this.user = user;
    });
  }

  updateUser(): void {
    this.usersService.editUser(this.user).subscribe(() => {
      this.router.navigate(['/users']);
    });
  }

}
