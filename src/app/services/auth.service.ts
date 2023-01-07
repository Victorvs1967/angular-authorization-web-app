import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    sessionStorage.clear();
    return this.http.post(
      'http://localhost:8080/auth/login', { username: username, password: password })
      .pipe(
        map(
          (res: any) => sessionStorage.setItem('token', res.token)));
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(
      'http://localhost:8080/auth/signup', user);
  }
}
