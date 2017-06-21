<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { Room } from "./../models/room.model";
=======
import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { AF } from "./../providers/af";
import { FirebaseListObservable } from "angularfire2";
>>>>>>> faba10bd7805c773ba39fe593e9e41d9c378b809

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
<<<<<<< HEAD
export class HomePageComponent {

  currentRoom: Room;

  constructor() { }

  onRequestRoomChange(room: Room) {
    this.currentRoom = room;
  }
=======

export class HomePageComponent implements OnInit, AfterViewChecked {
  
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  public newMessage: string;
  public messages: FirebaseListObservable<any>;

  constructor(public afService: AF) { 
    this.messages = this.afService.messages;
  }

  scrollToBottom():void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Scrollada para baixo falhou!');
    }
  }

  isYou(email){
    if(email == this.afService.email)
      return true;
    else
      return false;
  }

  isMe(email){
    if(email == this.afService.email)
        return false;
    else
        return true;
  }
  
  sendMessage(){
    this.afService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
  
  ngOnInit() {
  }

>>>>>>> faba10bd7805c773ba39fe593e9e41d9c378b809
}
