import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseAuthState } from 'angularfire2';

import { Message } from 'app/models/message.model';
import { MessageService } from 'app/services/message.service';
import { User } from 'app/models/user.model';
import { UserService } from 'app/services/user.service';
import { Room } from 'app/models/room.model';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  private messages: FirebaseListObservable<Message[]>;
  private msgVal = '';
  private currentRoom = '/rooms/sala-01';
  @Input() user: User;
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;

  constructor(
    public af: AngularFire,
    public messageService: MessageService,
    public userService: UserService
  ) {
    this.changeRoom('/rooms/sala-01');
    
    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.user = currentUser;
      });

   }

  @Input()
  set room(room: string) {
    this.changeRoom(room);
    this.currentRoom = room;
  }

  get room(): string { return this.currentRoom; }

  changeRoom(room: string) {
    
    this.messages = <FirebaseListObservable<Message[]>>this.af.database.list(room);
    this.messages.subscribe((messageList) => {
      let self = this;
      setTimeout(function() {
        /@TODO: RETIRAR ESSE TIMEOUT/
        self.scrollBottom();
      }, 100);
    });

  };

  scrollBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  }

  sendChatMessage(theirMessage: string) {

    let now = new Date();

    if(theirMessage) {
      this.messageService.create(
        new Message(
          this.user.$key,
          this.user.name,
          theirMessage,
          now.toLocaleString(),
          now.getTime()
        ),
        this.messages
        ).then(() => {
          /@TODO: AINDA NECESSÁRIO DEPOIS DE ARRUMAR A COMUNICACAO POR QUERYS? /
          this.scrollBottom();
        });
    }

    this.msgVal = '';

  }

  ngOnInit() { }

}
