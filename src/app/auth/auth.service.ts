import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap, shareReplay } from 'rxjs/operators';
import { User } from './user.model';
import { AUTH } from '../constants/api.defines';

export const ANONYMOUS_USER: User = {
  username: undefined
}

@Injectable()
export class AuthService {

  private subject = new BehaviorSubject<User>(undefined);

  user$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));

  /** isLoggedIn observable */
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.username));

  /** isLoggedOut observable */
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));

  constructor(private http: HttpClient) {
    http.get<User>('/auth/user').pipe(
      tap(console.log))
      .subscribe(user => this.subject.next(user ? user : ANONYMOUS_USER));
  }
  signUp(username: string, password: string) {

    return this.http.post<User>('/auth/signup', { username, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }

  login(username: string, password: string) {
    return this.http.post<User>(AUTH.SIGNIN, { username, password }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }

  loginAsUser(username: string) {
    return this.http.post<User>('/api/admin', { username }).pipe(
      shareReplay(),
      tap(user => this.subject.next(user)));
  }

  logout(): Observable<any> {
    return this.http.post('/api/logout', null).pipe(
      shareReplay(),
      tap(user => this.subject.next(ANONYMOUS_USER)));
  }
}