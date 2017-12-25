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
        this.saludo(this.user.profile_image_url_https, this.user.name);
      })
      .catch(error => {
        this.error(error);
      });
  }

  public loginFb() {
    return this.afAuth.auth.signInWithPopup(this.fbProvider)
      .then(res => {
        this.user = res.additionalUserInfo.profile;
        console.log(res);
        const saludo = this.user.gender === 'male' ? 'Bienvenido' : 'Bienvenida';
        this.saludo(this.user.picture.data.url, this.user.name, saludo);
      })
      .catch(error => {
        this.error(error);
      });
  }

  public loginGoogle() {
    if (navigator.platform.indexOf('Android') >= 0) {
      return this.afAuth.auth.signInWithRedirect(this.googleProvider)
        .then(res => {
          this.user = res.additionalUserInfo.profile;
          const saludo = this.user.gender === 'male' ? 'Bienvenido' : 'Bienvenida';
          this.saludo(this.user.picture, this.user.name, saludo);
        })
        .catch(error => {
          this.error(error);
        });
    } else {
      return this.afAuth.auth.signInWithPopup(this.googleProvider)
      .then((res) => {
        this.user = res.additionalUserInfo.profile;
        console.log(res);
        const saludo = this.user.gender === 'male' ? 'Bienvenido' : 'Bienvenida';
        this.saludo(this.user.picture, this.user.name, saludo);
      })
      .catch(error => {
        this.error(error);
      });
    }
  }

  saludo(imagen, nombre, saludo = 'Bienvenido') {
    swal({
      title: `${saludo}`,
      type: 'success',
      html: `<img src=${imagen} style= 'width: 50px'><h2>${nombre}</h2>`
    });
  }

  error(err) {
    swal({
      title: 'Error!!',
      type: 'error',
      text: `${err}`
    });
  }

}
