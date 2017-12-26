import { Component, OnInit } from '@angular/core';
import { AuthenticatioServiceService } from '../authenticatio-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private autenticacion: AuthenticatioServiceService) {
    this.getUser();
   }

  getUser() {
    this.autenticacion.userState();
  }

  loginGoogle() {
    this.autenticacion.loginGoogle();
  }

  loginTwitter() {
    this.autenticacion.loginTwt();
  }

  loginFb() {
    this.autenticacion.loginFb();
  }

  ngOnInit() {
  }

}
