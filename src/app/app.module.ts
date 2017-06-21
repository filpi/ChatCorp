import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from 'app/services/auth.service';
import { BaseService } from 'app/services/base.service';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { MessageService } from 'app/services/message.service';
import { UserService } from 'app/services/user.service';
import { RoomnavComponent } from './roomnav/roomnav.component';
import { RouterModule, Routes } from "@angular/router";
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { HomePageComponent } from './home-page/home-page.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCexnzvYcrQvlVQKf2lupAQmDHuk81Knx0",
    authDomain: "chatbot-874a0.firebaseapp.com",
    databaseURL: "https://chatbot-874a0.firebaseio.com",
    projectId: "chatbot-874a0",
    storageBucket: "chatbot-874a0.appspot.com",
    messagingSenderId: "844993562813"
};

const routes: Routes = [
  {path: '', component: ChatroomComponent },
  {path: 'auth', component: AuthComponent },
  {path: 'register', component: RegistrationPageComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ChatroomComponent,
    RoomnavComponent,
    RegistrationPageComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    // UserService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

