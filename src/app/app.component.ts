import { Component } from '@angular/core';
import { AF } from "./providers/af";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isLoggedIn: boolean;

  // items: FirebaseListObservable<any>;
  // name: any;
  // msgVal = '';

  // chats: Array<{
  //   name: string,
  //   isAllowed: boolean,
  //   link: string
  // }>;

  constructor(public afService: AF, private router: Router) {
    this.afService.af.auth.subscribe(
        (auth) => {
          if (auth == null) {
            console.log("Usuário ainda não logado!");
            this.isLoggedIn = false;
            this.router.navigate(['login']);
          } else {
            console.log("Logado com sucesso!");
            if(auth.google){
              this.afService.displayName = auth.google.displayName;
              this.afService.email = auth.google.email;
            }else{
              this.afService.displayName = auth.auth.email;
              this.afService.email = auth.auth.email;
            }
            this.isLoggedIn = true;
            this.router.navigate(['']);
          }
        }
    );

  //   this.chats = [
  //     { name: 'Sala 01', isAllowed: true, link: '/mensagens' },
  //     { name: 'Sala 02', isAllowed: true, link: '/mensagens2' }

  //   ];
  }

  // abobora(sala: string): string {
  //   this.items = this.af.database.list(sala, {
  //     query: {
  //       limitToLast: 20
  //     }
  //   });
  //   return sala;
  // };

  // login() {
  //   this.af.auth.login({
  //     provider: AuthProviders.Password,
  //     method: AuthMethods.Popup
  //   });
  // }

  // chatSend(theirMessage: string) {
  //   let now = new Date();
  //   // @TODO colocar isso numa classe externa?
  //   let msg = {
  //     message: theirMessage,
  //     name: this.name,
  //     date: now.toLocaleString(),
  //     timestamp: now.getTime()
  //   };

  //   this.items.push(msg);
  //   this.msgVal = '';
  // }

  logout() {
    this.afService.logout();
  }
}
