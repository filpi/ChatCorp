import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';

import { BaseService } from './base.service';
import { Message } from '../models/message.model';

@Injectable()
export class MessageService extends BaseService {

  constructor(
    public af: AngularFire,
    public http: Http
  ) {
    super();
  }

  create(message: Message, listMessages: FirebaseListObservable<Message[]>): firebase.Promise<void> {
    return listMessages.push(message)
      .catch(this.handlePromiseError);
  }
}