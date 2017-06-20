import { User } from 'app/models/user.model';

export class Room {

  public $key: string;
  public users: User[];

  constructor(
    public title: string,
    public link: string
  ) {}

}


