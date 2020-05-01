import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { Card } from '../card';

@Component({
  selector: 'app-game',
  template: `<table>
  <tr>
    <p *ngIf="gameStarted">TOP</p>
    <th *ngFor="let card of top">
      <img src={{card.image}} alt={{card.code}} width="75" height="105">
    </th>
  </tr>
  <tr>
  <p *ngIf="gameStarted">MIDDLE</p>
    <th *ngFor="let card of middle">
      <img src={{card.image}} alt={{card.code}} width="75" height="105">
    </th>
  </tr>
  <tr>
  <p *ngIf="gameStarted">BOTTOM</p>
    <th *ngFor="let card of bottom">
      <img src={{card.image}} alt={{card.code}} width="75" height="105">
    </th>
  </tr>
</table>

<div class="start">
  <button class="button" mat-raised-button color="primary" (click)="drawCard()" [disabled]="gameStarted">Start game</button>
</div>

<div class="bottom" *ngIf="gameStarted">
  <div>
    <img src={{card.image}} alt={{card.code}} width="95" height="125">
  </div>
  <button mat-stroked-button color="primary" (click)="placeTop()" [disabled]="topFull">Top</button>
  <button mat-stroked-button color="primary" (click)="placeMiddle()" [disabled]="middleFull">Middle</button>
  <button mat-stroked-button color="primary" (click)="placeBottom()" [disabled]="bottomFull">Bottom</button>
</div>`,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameStarted: boolean = false;
  imageFetched: boolean = false;
  topFull: boolean = false;
  middleFull: boolean = false;
  bottomFull: boolean = false;
  allFull: boolean = false;
  card: Card;
  top: Card[] = [];
  middle: Card[] = [];
  bottom: Card[] = [];

  constructor(private cardsService : CardsService) {

  }

  ngOnInit(): void {
    this.cardsService.fetchDeck();
  }

  drawCard() : void {
    this.gameStarted = true;
    this.cardsService.drawCard((result) => {
      this.card = result;
    });
  }

  placeTop() : void {
    this.top.push(this.card)
    this.drawCard()
    if (this.top.length === 3) {
      this.topFull = true
    }
  }

  placeMiddle() : void {
    this.middle.push(this.card)
    this.drawCard()
    if (this.middle.length === 5) {
      this.middleFull = true
    }
  }

  placeBottom() : void {
    this.bottom.push(this.card)
    this.drawCard()
    if (this.bottom.length === 5) {
      this.bottomFull = true
    }
  }
}
