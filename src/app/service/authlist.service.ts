import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthlistService {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:3000/users';

  constructor() {}

  getAllUser() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
