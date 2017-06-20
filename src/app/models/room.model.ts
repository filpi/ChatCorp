import { User } from 'app/models/user.model';

export class Room {

  public $key: string;

  constructor(
    public title: string,
    public users: User[]
  ) {}

}


