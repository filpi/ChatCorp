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
  msgVal: string = '';

  constructor(public af: AngularFire) {
    this.items = af.database.list('/messages', {
      query: {
        limitToLast: 20
      }
    });

    // this.af.auth.subscribe(auth => {
    //   if(auth) {
        this.name = "IADTEC";
    //   }
    // });
  }

  login() {
    this.af.auth.login({
      provider: AuthProviders.Password,
      method: AuthMethods.Popup
    })
  }

  logout() {
     this.af.auth.logout();
  }

  chatSend(theirMessage: string) {
    this.items.push({ message: theirMessage, name: this.name});
    this.msgVal = '';
  }

}
