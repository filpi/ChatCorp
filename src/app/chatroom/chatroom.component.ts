import { Component, OnInit, Input } from '@angular/core';
import { User } from 'app/models/user.model';

import { AngularFire, AuthProviders,
  AuthMethods, FirebaseListObservable,
  FirebaseAuthState } from 'angularfire2';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent implements OnInit {

  private items: FirebaseListObservable<any>;
  private msgVal = '';
  private currentRoom = '/sala-01';
  @Input() user: User;

  constructor(
    public af: AngularFire
  ) {
    this.changeRoom('/sala-01');
   }

  @Input()
  set room(room: string) {
    this.changeRoom(room);
    this.currentRoom = room;
  }

  get room(): string { return this.currentRoom; }

  changeRoom(room: string) {
    this.items = this.af.database.list(room, {
      query: {
        limitToLast: 20
      }
    });
  };

  sendChatMessage(theirMessage: string) {
    let now = new Date();
    // @TODO colocar isso numa classe externa?
    let msg = {
      message: theirMessage,
      name: this.user.name,
      date: now.toLocaleString(),
      timestamp: now.getTime()
    };
    if(msg.message.length > 0) {
      this.items.push(msg);
    }

  }

  

  ngOnInit() {
  }

}
