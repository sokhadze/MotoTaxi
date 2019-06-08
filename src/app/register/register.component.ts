import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../services/network.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isAuth = false;
  username = '';
  password = '';

  constructor(private network: NetworkService) { }

  ngOnInit() {}

  signUp() {
    if (this.username === '' || this.password === '') {
      return;
    }
    const data = {
      username: this.username,
      password: this.password
    };
    this.network.postRequest(data, `/register`)
        .subscribe(
            (response) => {
              alert(response);
            }
        );
  }
}
