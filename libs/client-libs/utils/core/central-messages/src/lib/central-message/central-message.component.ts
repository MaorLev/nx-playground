import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CentralMessageService } from '../central-message.service';
import {
  Message,
} from '../central-message.types';

@Component({
  selector: 'ml-central-message',
  templateUrl: './central-message.component.html',
  styleUrls: ['./central-message.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentralMessageComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private centralMessageService: CentralMessageService) {}

  ngOnInit(): void {
    this.messages$ = this.centralMessageService.messages$;
  }

  remove(message: Message): void {
    this.centralMessageService.removeMessage(message);
  }
}
