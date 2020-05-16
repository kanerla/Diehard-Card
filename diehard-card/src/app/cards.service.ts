import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private http: HttpClient;
  private deckId = '';
  private card: Card;
  private cards: Card[] = [];
  private baseUrl = 'https://deckofcardsapi.com/api/deck/';
  headers;
  private proxyurl = 'https://cors-anywhere.herokuapp.com/';

  constructor(http: HttpClient) {
    this.http = http;
    this.headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
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
      console.log(this.card.suit);
      console.log(this.card.value);
      console.log(this.card.code);
      callBackFunction(this.card);
    });
  }

  drawCards(callBackFunction: (result: Card[]) => void): void {
    this.http.get(this.proxyurl + this.baseUrl + this.deckId + '/draw/?count=13', { headers: this.headers}).subscribe(json => {
      for (const key in json) {
        if (key === 'cards') {
          this.cards = json[key];
        }
      }
    });

    this.cards.forEach( (card) => {
      console.log(card.code);
    });

    callBackFunction(this.cards);
  }

  shuffleDeck(): void {
    this.http.get(this.baseUrl + this.deckId + '/shuffle/').subscribe(json => {
      console.log(json);
    });
  }
}
