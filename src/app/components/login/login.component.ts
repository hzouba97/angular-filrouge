import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {StorageService} from "../../services/storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userConnected!: User;

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.userConnected = this.storageService.getUser();
    }
  }

  onSubmit(): void {
    const {username, password} = this.form;

    this.authService.login(username, password)
      .subscribe({
        next: data => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error: err => {
          console.log(err)
          this.errorMessage = err.error?.message;
          this.isLoginFailed = true;
        }
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
