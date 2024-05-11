import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { User } from '../../common/user';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  storage: Storage = sessionStorage;
  flag: number = -1;
  role: string = '';
  userEmail: string = JSON.parse(this.storage.getItem('user'));
  user: User = new User();
  constructor(private loginService: LoginService, private router: Router) {
    if (this.userEmail != null) {
      this.getUser();
    }
  }
  ngOnInit(): void {}
  getUser() {
    this.loginService
      .getUserByEmail(this.userEmail)
      .pipe(catchError((err) => EMPTY))
      .subscribe((data) => {
        this.user = data;
        this.flag = +data.id;
        this.role = data.role;
      });
  }
  onLogout() {
    this.storage.removeItem('user');
    this.router.navigate(['/main']);
    setTimeout(() => {
      window.location.reload();
    }, 5);
  }
}
