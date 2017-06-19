import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from 'app/services/auth.service';
import { BaseService } from 'app/services/base.service';
import { UserService } from 'app/services/user.service';
import { AuthComponent } from './auth/auth.component';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { RoomnavComponent } from './roomnav/roomnav.component';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDxvqecmeHuCaL4ArdCqQO0k_BXw0L3-YQ',
  authDomain: 'teste-614a3.firebaseapp.com',
  databaseURL: 'https://teste-614a3.firebaseio.com',
  projectId: 'teste-614a3',
  storageBucket: 'teste-614a3.appspot.com',
  messagingSenderId: '611762599079'


};


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatroomComponent,
    RoomnavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    AuthService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

