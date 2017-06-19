import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';

import { AuthService } from "app/services/auth.service";
import { UserService } from "app/services/user.service";
import { User } from "app/models/user.model";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal = '';
  user = new User("Sergio", "sergiocoletto2", "sergio2@email.com", "123456");

  chats: Array<{
    name: string,
    isAllowed: boolean,
    link: string
  }>;

  constructor(
    public af: AngularFire,
    public authService: AuthService,
    public userService: UserService
  ) {

    this.chats = [
      { name: 'Sala 01', isAllowed: true,  link: '/sala-01' },
      { name: 'Sala 02', isAllowed: true,  link: '/sala-02' },
      { name: 'Sala 03', isAllowed: true,  link: '/sala-03' }    
    ];

    this.login(this.user);
  }

  changeChat(sala: string): string {
    this.items = this.af.database.list(sala, {
      query: {
        limitToLast: 20
      }
    });
    return sala;
  };

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
          console.log(`O username ${user.username} já está sendo usado em outra conta!`);
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
      console.log("Erro ao criar usuário: " + error);
    });
  }

  chatSend(theirMessage: string) {
    let now = new Date();
    // @TODO colocar isso numa classe externa?
    let msg = {
      message: theirMessage,
      name: this.name,
      date: now.toLocaleString(),
      timestamp: now.getTime()
    };

    this.items.push(msg);
    this.msgVal = '';
  }

}
