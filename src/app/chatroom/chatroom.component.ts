import { Component, OnInit, Input, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { AngularFire,
         AuthProviders,
         AuthMethods,
         FirebaseListObservable,
         FirebaseAuthState } from 'angularfire2';
import { AuthService } from "./../services/auth.service";
import { Message } from './../models/message.model';
import { MessageService } from './../services/message.service';
 //import { User } from 'app/models/user.model';
// import { UserService } from 'app/services/user.service';
//import { Room } from './../models/room.model';
@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})

export class ChatroomComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('scrollContainer') scrollContainer: ElementRef;
  
  ngAfterViewChecked() {
    this.scrollBottom();
  }

  // msgVal = '';
  messages: FirebaseListObservable<Message[]>;
  public newMessage: string;
  // public messages: FirebaseListObservable<any>;
  //_currentRoom: Room;
  // @Input() user: string;

  constructor(
    public af: AngularFire, public authService: AuthService,
    public messageService: MessageService,
    // public userService: UserService
  ) {
       this.messages = this.messageService.messages;
    
    
    // this.userService.currentUser
    //   .first()
    //   .subscribe((currentUser: User) => {
    //     //por algum motivo, currentUser está retornando um array
    //     //provavelmente algo a ver com o uso de list()?
    //     this.user = currentUser[0];
    //   });

   }

  // @Input()
  // set room(room: Room) {
  //   this.changeRoom(room);
  //   this._currentRoom = new Room('Sala 01', '/rooms/sala-01');
  // }

  // get room(): Room { return this._currentRoom; }

  // changeRoom(room: Room) {
  //   this.messages = <FirebaseListObservable<Message[]>>this.af.database.list(room.link);
  //   this.messages.subscribe((messageList) => {
  //     let self = this;
  //     setTimeout(function() {
  //       /@TODO: RETIRAR ESSE TIMEOUT/;
  //       self.scrollBottom();
  //     }, 100);
  //   });

  // };

  scrollBottom() {
    this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
  } catch(err){
    console.log('Scrollada para baixo falhou');
  }

  sendMessage(){
    this.messageService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  // sendChatMessage(theirMessage: string) {

  //   let now = new Date();

  //   console.log(this.user);
  //   if (theirMessage) {
  //     this.messageService.create(
  //       new Message(
  //         this.user.$key,
  //         this.user.name,
  //         theirMessage,
  //         now.toLocaleString(),
  //         now.getTime()
  //       ),
  //       this.messages
  //       ).then(() => {
  //         /*@TODO: AINDA NECESSÁRIO DEPOIS DE ARRUMAR A COMUNICACAO POR QUERYS? */;
  //         this.scrollBottom();
  //       });
  //   }

  //   this.msgVal = '';

  // }

  isYou(email){
    if(email == this.authService.email)
      return true;
    else
      return false;
  }

  isMe(email){
    if(email == this.authService.email)
        return false;
    else
        return true;
  }

  ngOnInit() { }

}
