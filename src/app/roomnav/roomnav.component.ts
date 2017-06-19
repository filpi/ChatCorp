import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-roomnav',
  templateUrl: './roomnav.component.html',
  styleUrls: ['./roomnav.component.css']
})
export class RoomnavComponent implements OnInit {
  @Input() user: User;
  @Output() onRequestRoomChange = new EventEmitter<string>();

  chats: Array<{
    name: string,
    isAllowed: boolean,
    link: string
  }>;

  constructor() {
    this.chats = [
      { name: 'Sala 01', isAllowed: true, link: '/sala-01' },
      { name: 'Sala 02', isAllowed: true, link: '/sala-02' },
      { name: 'Sala 03', isAllowed: true, link: '/sala-03' }
    ];
  }


  changeChat(room: string): string {
    this.onRequestRoomChange.emit(room);
    return room;
  };

  ngOnInit() {
  }

}
