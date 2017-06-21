import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { AuthService } from "./../services/auth.service";
=======
import { AF } from "./../providers/af";
>>>>>>> faba10bd7805c773ba39fe593e9e41d9c378b809
import { Router } from "@angular/router";


@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent {
  public error: any;

<<<<<<< HEAD
  constructor(private afService: AuthService, private router: Router) {
=======
  constructor(private afService: AF, private router: Router) {
>>>>>>> faba10bd7805c773ba39fe593e9e41d9c378b809

  }

  register(event, name, email, password){
    event.preventDefault();
    this.afService.registerUser(email, password).then((user) => {
      this.afService.saveUserInfoFromForm(user.uid, name, email).then(() => {
        this.router.navigate(['']);
      })
        .catch((error) => {
          this.error = error;
        });
    })
      .catch((error) => {
        this.error = error;
        console.log(this.error);
      });
  }
}
