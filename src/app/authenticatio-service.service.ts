import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticatioServiceService {

  googleProvider = new firebase.auth.GoogleAuthProvider();
  fbProvider = new firebase.auth.FacebookAuthProvider();
  twtProvider = new firebase.auth.TwitterAuthProvider();
  user: any;
  imgURL;
  uid;

  constructor(private afAuth: AngularFireAuth) { }

  // Funcion para loguearse con twitter
  public loginTwt() {
    if (this.platform()) {
      // si la plataforma es mobile se llama al logueo con redirección
      return this.afAuth.auth.signInWithRedirect(this.twtProvider);
    } else {
      // si la plataforma no es mobile se llama al logueo con ventana emergente
      return this.afAuth.auth.signInWithPopup(this.twtProvider)
        .then(res => {
          // se toma el resultado del login y se le asigna a la variable user
          // el valor de los datos del perfil del usuario logueado
          this.user = res.additionalUserInfo.profile;
          // se llama a la funcion saludo para mostrar el mensaje de bienvenida
          // con los datos de la persona logueada
          this.saludo(this.user.profile_image_url_https, this.user.name);
        })
        // en caso de haya un error se captura en la siguiente linea
        .catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            // si ya hay una cuenta existente con esa cuenta de correo electronico
            // se despliega un mensaje de aviso
            this.errorEmail();
          } else {
            // si se trata de otro tipo de error entonces se muestra a continuación
            this.error(error);
          }
        });
      }
  }

  // Función para loguearse con twitter
  public loginFb() {
    if (this.platform()) {
      // si la plataforma es mobile entonces se llama a la funcion de logueo con redirección
      return this.afAuth.auth.signInWithRedirect(this.fbProvider);
    } else {
      // si la plataforma no es mobile entonces se llama a la funcion de logueo con ventana emergente
      return this.afAuth.auth.signInWithPopup(this.fbProvider)
        .then(res => {
          // se toma el resultado de la funcion de logueo y se le asigna a la variable user
          // los datos de perfil de la persona logueada
          this.user = res.additionalUserInfo.profile;
          // dependiendo del genero de la persona logueada se cambia la palabra de bienvenida
          const saludo = this.user.gender === 'male' ? 'Bienvenido' : 'Bienvenida';
          // se llama a la funcion saludo para mostrar un mensaje de bienvenida a la persona logueada
          this.saludo(this.user.picture.data.url, this.user.name, saludo);
        })
        // en caso que haya un error entonces se captura con la siguiente linea
        .catch(error => {
          if (error.code === 'auth/account-exists-with-different-credential') {
            // si ya existe una cuenta con ese correo electronico entonces se muestra un mensaje
            // notificandoselo a la persona
            this.errorEmail();
          } else {
            // si se trata de otro tipo de error entonces se muestra a continuacion
            this.error(error);
          }
        });
      }
  }

  // Funcion para loguearse con google
  public loginGoogle() {
    if (this.platform()) {
      // si la plataforma es mobile entonces se llama a la funcion de logueo con redireccion
      return this.afAuth.auth.signInWithRedirect(this.googleProvider);
    } else {
      // si la plataforma no es mobile entonces se llama  a la funcion de logueo con ventana emergente
      return this.afAuth.auth.signInWithPopup(this.googleProvider)
      .then((res) => {
        // se toma el resultado de la funcion de logueoy se le asigna a la variable user
        // los datos del perfil de la persona logueada
        this.user = res.additionalUserInfo.profile;
        // dependiendo del genero de la persona logueada se cambia la palabra de bienvenida
        const saludo = this.user.gender === 'male' ? 'Bienvenido' : 'Bienvenida';
        // se llama a la funcion de saludo para mostrar un mensaje de bienvenida
        // con los datos de la persona logueada
        this.saludo(this.user.picture, this.user.name, saludo);
      })
      // en caso de que haya un error entonces se captura en la siguiente linea
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          // si ya existe una cuenta asociada a ese correo electronico entonces
          // se muestra un mensaje notificando a la persona
          this.errorEmail();
        } else {
          // en caso de que se trate de otro tipo de error
          // entonces se muestra en la siguiente linea
          this.error(error);
        }
      });
    }
  }

  // funcion para mostrar un mensaje dandole la bienvenida al usuario
  // de acuerdo a los datos suministrados por el proveedor de indentidad
  saludo(imagen, nombre, saludo = 'Bienvenido') {
    swal({
      title: `${saludo}`,
      type: 'success',
      html: `<img src=${imagen} style= 'width: 50px'><h2>${nombre}</h2>`
    });
  }

  // funcion para mostrar un mensaje de error en pantalla
  // de forma legible
  error(err) {
    swal({
      title: 'Error!!',
      type: 'error',
      text: `
      error code: ${err.code}
      error message ${err.message}`
    });
  }

  // funcion para detectar el estado del usuario
  public userState() {
    this.afAuth.authState
    // nos suscribimos al estado del usuario para detectar cualquier cambio
    // justo en el momento en que ocurra
      .subscribe(res => {
        // se lee asigna el valor del id del usuario a la variable uid
        this.uid = res.uid;
        if (this.platform()) {
          // si la plataforma es mobile se llama a la funcion para obtener
          // los resultados de logueo en caso de que se haya llamado anteriormente
          // a la funcion de logueo con redireccion
          this.afAuth.auth.getRedirectResult()
            .then(result => {
              // se le asigna el valor del proveedor de identidad
              // a la variable providerId
              const providerId = result.additionalUserInfo.providerId;
              if (providerId.indexOf('google.com') >= 0 ) {
                // si el proveedor de identidad es google entonces
                // se busca la iamgen de perfil en la siguiente direccion
                this.imgURL = result.additionalUserInfo.profile.picture;
              } else if (providerId.indexOf('facebook.com') >= 0) {
                // si el proveedor de identidad es facebook entonces
                // se busca la imagen de perfil en la siguiente direccion
                this.imgURL = result.additionalUserInfo.profile.picture.data.url;
              } else if (providerId.indexOf('twitter.com') >= 0) {
                // si el proveedor de identidad es twitter entonces
                // se busca la imagen de perfil en la siguiente direccion
                this.imgURL = result.additionalUserInfo.profile.profile_image_url_https;
              }
            })
            .then(() => {
              // despues de ejecutar la funcion anterior se llama a la funcion
              // para obtener datos en caso de una redireccion nuevamente
              this.afAuth.auth.getRedirectResult()
                .then(resul => {
                  // se toma el resultado de la funcion y se le asignan a la variable user
                  // los datos de perfil del usuario logueado
                  this.user = resul.additionalUserInfo.profile;
                  let saludo;
                  if (this.user.gender === 'male') {
                    // si el genero del usuario es masculino entonces se asigna
                    // la palabra Bienvenido a la variable saludo
                    saludo = 'Bienvenido';
                  } else if (this.user.gender === undefined) {
                    // si el genero del usuario es indefinido entonces
                    // se le asigna la palabra Bienvenido a la variable saludo
                    saludo = 'Bienvenido';
                  } else {
                    // si el genero del usuario es femenino entonces
                    // se le asigna la palabra Bienvenida a la variable saludo
                    saludo = 'Bienvenida';
                  }
                  // se llama a la funcion saludo para mostrar un mensaje de bienvenida
                  // al usuario con sus datos de perfil
                  this.saludo(this.imgURL, this.user.name, saludo);
                })
                // en caso de que haya un error entonces se captura en la siguiente linea
                .catch(err => {
                  this.error(err);
                });
            })
            .catch(error => {
              if (error.code === 'auth/account-exists-with-different-credential') {
                // si ya existe una cuenta asociada a ese correo electronico entonces
                // se muestra un mensaje de notificacion al usuario
                this.errorEmail();
              }
            });
        }
      });
  }

  // funcion para detectar la plataforma del dispositivo que esta usando el usuario
  platform() {
    if (navigator.appVersion.indexOf('Android') >= 0 || navigator.appVersion.indexOf('iPhone') >= 0) {
      // si la plataforma es Android o iPhone entonces retorna verdadero
      return true;
    } else {
      // si la plataforma no es Android ni iPhone entonces retorna falso
      return false;
    }
  }

  // funcion para mostrar el error de cuenta existente
  errorEmail() {
    swal({
      title: 'Error!!',
      type: 'error',
      text: 'Ya existe una cuenta asociada a esta dirección de correo electrónico'
    });
  }

}
