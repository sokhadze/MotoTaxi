import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

class UserModel {
  constructor(public id: any,
              public username: any,
              public password: any) {
}
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user = new BehaviorSubject<UserModel>(null);
  getUser = this.user.asObservable();

  constructor() {
  }

  setUser(user: UserModel) {
    this.user.next(user);
  }
}
