import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { SentMessage } from 'src/app/Models/sent-message';

@Injectable({
  providedIn: 'root'
})
export class ChatCoeService {

  constructor(private ChatWithBot: HttpClient) { }

  send(sentMessage: SentMessage): Observable<SentMessage>{
    let headers = new HttpHeaders
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return this.ChatWithBot.post<SentMessage>(
        "http://localhost:1996/chatwithbot", 
        JSON.stringify(sentMessage), 
        {headers}
      )
  }
}
