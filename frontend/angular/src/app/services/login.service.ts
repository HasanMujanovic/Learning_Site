import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { BehaviorSubject, EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  user: User = new User();
  baseUrl = 'http://localhost:8080/utun/';
  usersUrl = this.baseUrl + `users`;

  constructor(private http: HttpClient) {}

  getUserByEmail(email: string): Observable<User> {
    const searchUrl = this.baseUrl + `users/search/findByEmail?email=${email}`;
    return this.http.get<User>(searchUrl);
  }
  saveUser(user: User): Observable<any> {
    return this.http.post<User>(this.usersUrl, user);
  }
}
