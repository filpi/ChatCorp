import { Component, OnInit } from '@angular/core';
import { Room } from "./../models/room.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  currentRoom: Room;

  constructor() { }

  onRequestRoomChange(room: Room) {
    this.currentRoom = room;
  }
}
