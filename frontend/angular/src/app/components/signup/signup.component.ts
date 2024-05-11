import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { User } from '../../common/user';
import { EMPTY, Observable, catchError, concatMap, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  role: string = 'admin';
  user: User = new User();
  signupForm: FormGroup;

  storage: Storage = sessionStorage;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      signup: this.formBuilder.group({
        userName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
    });
  }

  setRoleAdmin() {
    this.role = 'admin';
  }
  setRoleUser() {
    this.role = 'user';
  }

  onSubmit() {
    let userName = this.signupForm.get('signup.userName').value;
    let lastName = this.signupForm.get('signup.lastName').value;
    let password = this.signupForm.get('signup.password').value;
    let email2 = this.signupForm.get('signup.email').value;

    this.user.email = email2;
    this.user.password = password;
    this.user.lastName = lastName;
    this.user.userName = userName;
    this.user.role = this.role;

    let flag: boolean = true;
    this.loginService
      .getUserByEmail(email2)
      .pipe(catchError((err) => EMPTY))
      .subscribe({
        next: (res) => {
          if (res.email == email2) {
            console.log('alredy exist');
            flag = false;
          }
        },
      });
    setTimeout(() => {
      if (flag) {
        this.loginService.saveUser(this.user).subscribe((data) => {
          this.storage.setItem('user', JSON.stringify(this.user.email));
          this.storage.setItem('role', JSON.stringify(this.user.role));
          this.router.navigate(['/courses']);
          setTimeout(() => {
            window.location.reload();
          }, 5);
        });
      }
    }, 500);
  }
}
