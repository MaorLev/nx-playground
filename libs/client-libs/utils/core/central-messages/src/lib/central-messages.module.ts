import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralMessageComponent } from './central-message/central-message.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiErrorInterceptor } from './api-error-interceptor.interceptor';

@NgModule({
  imports: [CommonModule],
  declarations: [CentralMessageComponent],
  exports: [CentralMessageComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiErrorInterceptor, multi: true },
  ],
})
export class CentralMessagesModule {}
