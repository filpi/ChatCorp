import { Component } from '@angular/core';
// import { AngularFire, AuthProviders, AuthMethods, FirebaseListObservable,
// FirebaseAuthState } from 'angularfire2';
import { AuthService } from './services/auth.service';
import { Router } from "@angular/router";
// import { ChatroomComponent } from './chatroom/chatroom.component';
// import { User } from 'app/models/user.model';
// import { UserService } from 'app/services/user.service';
// import { Room } from "./models/room.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  // name: any;
  // msgVal = '';
  // user = new User('', '', '', '');
  // currentRoom: Room;


  constructor(public authService: AuthService, private router: Router,
              // public af: AngularFire, public userService: UserService
             ) {
    // this.login(this.user);
    this.authService.af.auth.subscribe(
        (auth) => {
          if (auth == null) {
            console.log("Usuário ainda não logado!");
            this.isLoggedIn = false;
            this.router.navigate(['auth']);
          } else {
            console.log("Logado com sucesso!");
            if(auth.google){
              this.authService.displayName = auth.google.displayName;
              this.authService.email = auth.google.email;
            }else{
              this.authService.displayName = auth.auth.email;
              this.authService.email = auth.auth.email;
            }
            this.isLoggedIn = true;
            this.router.navigate(['']);
          }
        }
    );
  }

  // login(user: User) {
  //   this.userService.userExists(user.username)
  //     .first()
  //     .subscribe((userExists: boolean) => {

  //       if (!userExists) {

  //         this.authService.createAuthUser({
  //             email: user.email,
  //             password: user.password
  //           }).then((authState: FirebaseAuthState) => {

  //             delete user.password;
  //             let uuid: string = authState.auth.uid;

  //             this.userService.create(user, uuid)
  //               .then(() => {
  //                 console.log('Usuario cadastrado!');

  //               }).catch((error: any) => {
  //                 console.log(error);
  //               });

  //           }).catch((error: any) => {
  //             console.log(error);
  //           });
  //       } else {
  //         this.userService.setCurrentUser(user);
  //         this.name = user.username;
  //       }

  //     });
  // }

  logout() {
    this.authService.logout();
  }

  // createUser(user: User) {
  //   this.authService.createAuthUser(user)
  //     .catch(error => {
  //       console.log('Erro ao criar usuário: ' + error);
  //     });
  // }

  // onRequestRoomChange(room: Room) {
  //   this.currentRoom = room;
  // }
}
