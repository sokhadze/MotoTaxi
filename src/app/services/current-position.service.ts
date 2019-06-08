import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentPositionService {

  private user = new BehaviorSubject<any>(null);
  getLocation = this.user.asObservable();

  constructor() {
  }

  setlocation(user: any) {
    this.user.next(user);
  }
}
