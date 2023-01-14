import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { LoginInfo } from '../models/login.info.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginInfo: LoginInfo): Observable<any> {
    sessionStorage.clear();
    return this.http.post<any>(
      environment.authUrl.concat('login'), loginInfo)
      .pipe(map((res: any) => sessionStorage.setItem('token', res.token)));
  }

  signup(user: User): Observable<User> {
    return this.http.post<User>(
      environment.authUrl.concat('signup'), user);
  }
}
