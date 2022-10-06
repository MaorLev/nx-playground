import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ml-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private httpClient: HttpClient) {}
  // constructor(private httpClient: HttpClient, private centralMessageService: CentralMessageService) {}

  generateCode(status: number) {
    this.httpClient.get(`https://httpstat.us/${status}?sleep=2000`).subscribe()


  }
}
