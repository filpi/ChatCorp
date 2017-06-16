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

  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 20
      }
    });

    // this.af.auth.subscribe(auth => {
    //   if(auth) {
        this.name = 'IADTEC';
    //   }
    // });
  }

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

    this.items.push(msg);
    this.msgVal = '';
  }

}
