import { Component } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods,FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  name: any;
  msgVal = '';

  chats: Array<{
    name: string,
    isAllowed: boolean,
    link: string
  }>;

  constructor(public af: AngularFire) {

    this.chats = [
        { name: 'Sala 01', isAllowed: true,  link: '/mensagens' },
        { name: 'Sala 02', isAllowed: true,  link: '/mensagens2' }
        
    ];

    // this.af.auth.subscribe(auth => {
    //   if(auth) {
        this.name = 'IADTEC';
    //   }
    // });
  }

  abobora(sala: string): string {
    this.items = this.af.database.list(sala, {
      query: {
        limitToLast: 20
      }
    });
    return sala;
  };

  login() {
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Popup
    });
  }

  logout() {
     this.af.auth.logout();
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
    if(msg.message.length > 0)
      this.items.push(msg);
    
    this.msgVal = '';
  }

}
