import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent {
  user: User = {
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

  constructor(private authService: AuthService, private router: Router) {
  }

  addUsers() {
    this.authService
      .register(this.user)
      .subscribe({
        next: ok => {
          this.router.navigate(['login']);
        },
        error: err => console.log(err)
      })

  }

}
