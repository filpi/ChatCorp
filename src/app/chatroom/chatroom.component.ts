import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

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
    this.items = this.af.database.list(room);

    this.items.subscribe(() => {
      this.scrollBottom();
    });

  };

  scrollBottom() {
    let selfPointer = this;
    // @TODO descobrit quando o bind foi feito na view para chamar o codigo sem usar esse timeout.
    setTimeout(function() {
      selfPointer.scrollContainer.nativeElement.scrollTop = selfPointer.scrollContainer.nativeElement.scrollHeight;
    }, 100);
  }

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

    this.msgVal = '';

  }

  ngOnInit() {
  }

}
