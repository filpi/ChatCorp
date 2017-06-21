import { Component } from '@angular/core';
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {
  public error: any;

  constructor(public afService: AuthService, private router: Router) { }

  loginWithEmail(event, email, password){
    event.preventDefault();
    this.afService.loginWithEmail(email, password).then(() => {
      this.router.navigate(['']);
    })
      .catch((error: any) => {
        if(error){
          this.error = error;
          console.log(this.error);
        }
      });
  }
}