import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { User } from '../models/user.model';
import { LoginInfo } from '../models/login.info.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = 'http://localhost:8080/auth/';

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<any> {
    sessionStorage.clear();
    return this.http.post<any>(
      this.authUrl.concat('login'), loginInfo)
      .pipe(
        map(
          (res: any) => sessionStorage.setItem('token', res.token)));
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(
      this.authUrl.concat('signup'), user);
  }
}
