import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { Card } from '../card';

@Component({
  selector: 'app-game',
  template: `<h1>Welcome</h1>
  <table>
  <tr>
    <th *ngFor="let card of top">
      <img src={{card.image}} alt={{card.code}} width="75" height="100">
    </th>
  </tr>
  <tr>
    <th *ngFor="let card of middle">
      <img src={{card.image}} alt={{card.code}} width="75" height="100">
    </th>
  </tr>
  <tr>
    <th *ngFor="let card of bottom">
      <img src={{card.image}} alt={{card.code}} width="75" height="100">
    </th>
  </tr>
</table>

  <div>
  <img src={{card.image}} alt={{card.code}}>
  <button mat-stroked-button color="primary" (click)="placeTop()">Top</button>
  <button mat-stroked-button color="primary" (click)="placeMiddle()">Middle</button>
  <button mat-stroked-button color="primary" (click)="placeBottom()">Bottom</button>
  </div>
  <button mat-raised-button color="primary" (click)="drawCard()">Draw a card</button>`,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  card: Card;
  top: Card[] = [];
  middle: Card[] = [];
  bottom: Card[] = [];

  constructor(private cardsService : CardsService) { }

  ngOnInit(): void {
    this.cardsService.fetchDeck();
  }

  drawCard() : void {
    this.cardsService.drawCard((result) => {
      this.card = result;
    });
  }

  placeTop() : void {
    this.top.push(this.card)
  }

  placeMiddle() : void {
    this.middle.push(this.card)
  }

  placeBottom() : void {
    this.bottom.push(this.card)
  }
}
