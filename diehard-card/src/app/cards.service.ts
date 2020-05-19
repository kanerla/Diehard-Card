import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http: HttpClient;
  private deckId = '';
  private card: Card;
  private baseUrl = 'https://deckofcardsapi.com/api/deck/';

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchDeck(): void {
    this.http.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .subscribe(data => {
      for (const key in data) {
        if (key === 'deck_id') {
          this.deckId = data[key];
        }
      }
    });
  }

  drawCard(callBackFunction: (result: Card) => void): void {
    this.http.get(this.baseUrl + this.deckId + '/draw/?count=1').subscribe(json => {
      for (const key in json) {
        if (key === 'cards') {
          this.card = json[key][0];
        }
      }
      callBackFunction(this.card);
    });
  }

  shuffleDeck(): void {
    this.http.get(this.baseUrl + this.deckId + '/shuffle/').subscribe(json => {
      console.log(json);
    });
  }
}
