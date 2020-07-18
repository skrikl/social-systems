import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

  checkUsers(): boolean {
    return !!this.localStorage.getItem('users');
  }

  setUsers(users): void {
    this.localStorage.setItem('users', users);
  }

  getUsers(): boolean {
    if (this.checkUsers()) {
      return this.localStorage.getItem('users').access;
    }
    return false;
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>('https://randomuser.me/api/', {});
  }

}
