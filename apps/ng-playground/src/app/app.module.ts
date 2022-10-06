import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';
import {SharedModule} from "./shared/shared.module";
import {HttpClientModule} from "@angular/common/http";
import {
  CentralMessageComponent,
  CentralMessagesModule, Message,
  MESSAGE_LOGGERS,
  MessageLogger
} from "@client-lib/central-messages";

class MessageConsoleLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log("My Custom Logger Maorr", message);
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    CentralMessagesModule
  ],
  providers: [{
    provide:MESSAGE_LOGGERS,
    useClass: MessageConsoleLogger,
    multi:true
  }],
  bootstrap: [AppComponent, CentralMessageComponent],
})
export class AppModule {}
