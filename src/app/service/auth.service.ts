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

  private loggedIn = new BehaviorSubject<boolean>(false);

  register(data: RegisterForm) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginForm) {
    return this.http.post(`${this.apiUrl}/login`, data).pipe(
      tap(() => {
        this.loggedIn.next(true);
        sessionStorage.setItem('loggedIn', 'true');
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false);
    sessionStorage.removeItem('loggedIn');
  }

  get isLoggedIn(): Observable<boolean> {
    const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
    this.loggedIn.next(loggedIn);
    return this.loggedIn.asObservable();
  }
}
