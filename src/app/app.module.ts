import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AuthenticatioServiceService } from './authenticatio-service.service';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthenticatioServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
