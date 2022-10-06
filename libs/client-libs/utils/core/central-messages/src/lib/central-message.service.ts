import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  Message,
  MESSAGE_LOGGERS,
  MessageLogger,
} from './central-message.types';

@Injectable({
  providedIn: 'root',
})
export class CentralMessageService {
  private _messages: BehaviorSubject<Message[]>;
  private _messageQueue: Message[];
  readonly messages$: Observable<Message[]>;
  constructor(
    @Inject(MESSAGE_LOGGERS) @Optional() private loggers: MessageLogger[]
  ) {
    this._messages = new BehaviorSubject<Message[]>([]);
    this._messageQueue = [];
    this.messages$ = this._messages.asObservable();
  }

  public setMessage(message: Message) {
    this._messageQueue.push(message);
    this._messages.next([...this._messageQueue]);

    if(this.loggers && this.loggers.length > 0)
    {
      this.loggers.forEach(logger => {
        logger.logMessage(message)
      })
    }
  }
  public removeMessage(message: Message): void {
    const index = this._messageQueue.indexOf(message);
    this._messageQueue.splice(index, 1);
    this._messages.next([...this._messageQueue]);
  }
}
