import { Component } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseAuthState } from 'angularfire2';

import { AuthService } from 'app/services/auth.service';
import { ChatroomComponent } from 'app/chatroom/chatroom.component';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name: any;
  msgVal = '';
  user = new User('Sergio', 'sergiocoletto2', 'sergio2@email.com', '123456');
  currentRoom = '/rooms/sala-01';


  constructor(
    public af: AngularFire,
    public authService: AuthService,
    public userService: UserService
  ) {
    this.login(this.user);
  }

  login(user: User) {

    this.userService.userExists(user.username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.createAuthUser({
              email: user.email,
              password: user.password
            }).then((authState: FirebaseAuthState) => {

              delete user.password;
              let uuid: string = authState.auth.uid;

              this.userService.create(user, uuid)
                .then(() => {
                  console.log('Usuario cadastrado!');

                }).catch((error: any) => {
                  console.log(error);
                });

            }).catch((error: any) => {
              console.log(error);
            });
        } else {
          this.userService.setCurrentUser(user);
          this.name = user.username;
        }

      });
  }

  logout() {
     this.af.auth.logout();
  }

  createUser(user: User) {
    this.authService.createAuthUser(user)
    .catch(error => {
      console.log('Erro ao criar usuário: ' + error);
    });
  }
}
