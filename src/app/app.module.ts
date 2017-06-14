import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCexnzvYcrQvlVQKf2lupAQmDHuk81Knx0",
    authDomain: "chatbot-874a0.firebaseapp.com",
    databaseURL: "https://chatbot-874a0.firebaseio.com",
    projectId: "chatbot-874a0",
    storageBucket: "chatbot-874a0.appspot.com",
    messagingSenderId: "844993562813"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
