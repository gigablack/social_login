import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import swal from 'sweetalert2';

@Injectable()
export class AuthenticatioServiceService {

  googleProvider = new firebase.auth.GoogleAuthProvider();
  fbProvider = new firebase.auth.FacebookAuthProvider();
  twtProvider = new firebase.auth.TwitterAuthProvider();
  user: any;

  constructor(private afAuth: AngularFireAuth) { }

  public loginTwt() {
    return this.afAuth.auth.signInWithPopup(this.twtProvider)
      .then(res => {
        this.user = res.additionalUserInfo.profile;
        console.log(res);
        swal({
          title: 'Bienvenido',
          type: 'success',
          html: `<img src=${this.user.profile_image_url} style= 'width: 50px'><h2>${this.user.name}</h2>`
        });
      })
      .catch(error => {
        swal({
          title: 'Error!!',
          type: 'error',
          text: `${error}`
        });
      });
  }

  public loginFb() {
    return this.afAuth.auth.signInWithPopup(this.fbProvider)
      .then(res => {
        this.user = res.additionalUserInfo.profile;
        console.log(res);
        swal({
          title: 'Bienvenido',
          type: 'success',
          html: `<img src=${this.user.picture.data.url} style= 'width: 50px'><h2>${this.user.name}</h2>`
        });
      })
      .catch(error => {
        swal({
          title: 'Error!!',
          type: 'error',
          text: `${error}`
        });
      });
  }

  public loginGoogle() {
    return this.afAuth.auth.signInWithPopup(this.googleProvider)
      .then((res) => {
        this.user = res.additionalUserInfo.profile;
        console.log(res);
        swal({
          title: 'Bienvenido',
          type: 'success',
          html: `<img src=${this.user.picture} style= 'width: 50px'><h2>${this.user.name}</h2>`
        });
      })
      .catch(error => {
        swal({
          title: 'Error!!',
          type: 'error',
          text: `${error}`
        });
      });
  }

}
