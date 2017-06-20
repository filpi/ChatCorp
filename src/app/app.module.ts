import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginPageComponent } from './login-page/login-page.component';
import { RouterModule, Routes } from "@angular/router";
import { AF } from "./providers/af";
import { HomePageComponent } from './home-page/home-page.component';
import { FormsModule } from "@angular/forms";
import { RegistrationPageComponent } from './registration-page/registration-page.component';


// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyCexnzvYcrQvlVQKf2lupAQmDHuk81Knx0",
    authDomain: "chatbot-874a0.firebaseapp.com",
    databaseURL: "https://chatbot-874a0.firebaseio.com",
    projectId: "chatbot-874a0",
    storageBucket: "chatbot-874a0.appspot.com",
    messagingSenderId: "844993562813"
};

// src/app/app.module.ts
const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegistrationPageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    RegistrationPageComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [AF],
  bootstrap: [AppComponent]
})
export class AppModule { }
