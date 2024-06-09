import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginForm, RegisterForm } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  http = inject(HttpClient);

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  register(data: RegisterForm) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginForm) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap((response: any) => {
        sessionStorage.setItem('user', JSON.stringify(response.user));
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!sessionStorage.getItem('user');
  }
}
