import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/user.model';
import { Room } from "app/models/room.model";

@Component({
  selector: 'app-roomnav',
  templateUrl: './roomnav.component.html',
  styleUrls: ['./roomnav.component.css']
})
export class RoomnavComponent implements OnInit {
  @Input() user: User;
  @Output() onRequestRoomChange = new EventEmitter<Room>();

  chats: Room[];
  selectedRoom: Room;

  constructor() {
    this.chats = [
      new Room('Sala 01', '/rooms/sala-01'),
      new Room('Sala 02', '/rooms/sala-02'),
      new Room('Sala 03', '/rooms/sala-03')
    ];
  }

  changeChat(room: Room): Room {
    this.onRequestRoomChange.emit(room);
    this.selectedRoom = room;
    return room;
  };

  ngOnInit() {
    this.changeChat(this.chats[0]);
  }

}
