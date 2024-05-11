import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../../common/user';
import { LoginService } from '../../services/login.service';
import { EMPTY, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  role: string = 'admin';
  loginForm: FormGroup;

  storage: Storage = sessionStorage;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
    });
  }

  onSubmit() {
    let email = this.loginForm.get('login.email').value;
    let password = this.loginForm.get('login.password').value;

    this.loginService
      .getUserByEmail(email)
      .pipe(catchError((err) => EMPTY))
      .subscribe((res) => {
        if (res.role == this.role && password == res.password) {
          this.storage.setItem('user', JSON.stringify(res.email));
          this.storage.setItem('role', JSON.stringify(res.role));

          this.router.navigate(['/courses']);

          setTimeout(() => {
            window.location.reload();
          }, 5);
        } else alert('Doesnt Exist');
      });
  }

  setRoleAdmin() {
    this.role = 'admin';
    console.log(this.role);
  }
  setRoleUser() {
    this.role = 'user';
    console.log(this.role);
  }
}
