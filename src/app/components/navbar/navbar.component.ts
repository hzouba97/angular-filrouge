import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  logoutLoading = false;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  logout(): void {
    this.logoutLoading = true;
    this.authService.logout().subscribe({
      next: res => {
        let logoutLoading = false;
        this.storageService.clean();
        this.router.navigate(['login'])
      },
      error: err => {
        let logoutLoading = false;
        console.log(err);
      }
    });

  }

  showProfil() {
    this.router.navigate(['users', this.storageService.getUser().id])
  }
}
