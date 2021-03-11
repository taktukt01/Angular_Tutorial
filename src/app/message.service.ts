import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  // We are going to inject this service into HeroService
  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}