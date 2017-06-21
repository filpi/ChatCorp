import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import 'rxjs/add/operator/map';
import { AuthService } from "./../services/auth.service";
// import { BaseService } from './base.service';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService /*extends BaseService*/ {

  public messages: FirebaseListObservable<Message[]>;

  constructor(
    public af: AngularFire,
    public authService: AuthService,
    public http: Http
  ) {
    //  super();
    this.messages = this.af.database.list('messages');
  }

  create(message: Message, listMessages: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return listMessages.push(message)
      // .catch(this.handlePromiseError)
      ;
  }

  sendMessage(theirMessage: string) {

    // let now = new Date();
    // console.log(this.user);
    console.log(this.authService.displayName);
    if (theirMessage) {
      this.create(
        new Message(
          this.authService.displayName,
          // this.user.name,
          theirMessage,
          this.authService.email,
          // now.toLocaleString(),
          // now.getTime()
          Date.now()
        ),
        this.messages
      )}
      // ).then(() => {
      //     /*@TODO: AINDA NECESSÁRIO DEPOIS DE ARRUMAR A COMUNICACAO POR QUERYS? */;
      //   this.scrollBottom();
      // });
    // }
  }
}