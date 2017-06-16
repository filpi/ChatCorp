import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyDtCx_vC7FZEw4SACEHQI3BSdItNbYI_QA',
  authDomain: 'testechat-5e947.firebaseapp.com',
  databaseURL: 'https://testechat-5e947.firebaseio.com',
  projectId: 'testechat-5e947',
  storageBucket: 'testechat-5e947.appspot.com',
  messagingSenderId: '688969599089'

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
