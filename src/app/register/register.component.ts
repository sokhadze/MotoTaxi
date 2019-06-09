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
  repeat_password = '';

  constructor(private network: NetworkService) { }

  ngOnInit() {}

  signUp() {
    if (this.password === this.repeat_password) {
      alert("პაროლები არ ემთხვევა!");
      return;
    }
    if (this.username === '' || this.password === '') {
        alert("შეავსეთ ცარიელი ველები!");
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
