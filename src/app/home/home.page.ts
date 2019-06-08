import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {NetworkService} from '../services/network.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    isAuth = false;
    username = '';
    password = '';

  constructor(private user: UserService,
              private network: NetworkService,
              private router: Router) {}

    ngOnInit() {
        this.checkUser();
    }

    checkUser() {
    this.user.getUser
        .subscribe(
            (user) => {
                if (localStorage.getItem('username') && localStorage.getItem('password')) {
                    console.log(user);
                    this.isAuth = true;
                    this.router.navigate(['profile']);
                }

            }
        );
    }

    signIn() {
      if (this.username === '' || this.password === '') {
          alert('შეავშეთ ცარიელი ველები');
          return;
      }
      const data = {
          username: this.username,
          password: this.password
      };
      this.network.postRequest(data, `/login`)
        .subscribe(
            (Data) => {
                localStorage.setItem('username', this.username);
                localStorage.setItem('password', this.password);

                if (this.user.getUser) {
                    this.router.navigate(['profile']);
                    return;
                }
                if (this.isAuth) {
                    this.router.navigate(['profile']);
                    return;
                }
                this.user.setUser(Data);
            }, error1 => {
                if (error1) {
                    alert('მომხმარებლის სახელი ან პაროლი არასწორია');
                }
            }
        );
    }


}
