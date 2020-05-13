import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { Card } from '../card';
import { MatDialog } from '@angular/material/dialog';

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
  <button class="button" mat-raised-button color="primary" (click)="drawCards()" [disabled]="gameStarted">Start game</button>
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
  gameStarted = false;
  imageFetched = false;
  topFull = false;
  middleFull = false;
  bottomFull = false;
  allFull = false;
  card: Card;
  cards: Card[] = [];
  top: Card[] = [];
  middle: Card[] = [];
  bottom: Card[] = [];
  index;

  constructor(private cardsService: CardsService) {
    this.index = 0;
  }

  ngOnInit(): void {
    this.cardsService.fetchDeck();
  }

  drawCard(): void {
    /*
    this.card = this.cards[this.index];
    this.index ++;
    */
   this.cardsService.drawCard((result) => {
     this.card = result;
   })
   this.gameStarted = true;
  }

  drawCards(): void {
    this.cardsService.drawCards((result) => {
      this.cards = result;
    });
    this.gameStarted = true;
    this.drawCard();
  }

  placeTop(): void {
    this.top.push(this.card);
    this.drawCard();
    if (this.top.length === 3) {
      this.topFull = true;
    }
    console.log(this.gameOver());
  }

  placeMiddle(): void {
    this.middle.push(this.card);
    this.drawCard();
    if (this.middle.length === 5) {
      this.middleFull = true;
    }
    console.log(this.gameOver());
  }

  placeBottom(): void {
    this.bottom.push(this.card);
    this.drawCard();
    if (this.bottom.length === 5) {
      this.bottomFull = true;
    }
    console.log(this.gameOver());
  }

  gameOver(): boolean {
    if (this.bottomFull && this.topFull && this.middleFull) {
      console.log('Game over!');
      this.compareHands(this.getHand(this.top), this.getHand(this.middle), this.getHand(this.bottom));
      /*
      console.log('top:');
      this.getHand(this.top);

      console.log('middle:');
      this.getHand(this.middle);

      console.log('bottom:');
      this.getHand(this.bottom);
      */
      return true;
    } else {
      return false;
    }
  }

  allEqual(arr: string[]): boolean {
    return arr.every(x => x === arr[0]);
  }

  checkForFlush(row: Card[]): boolean {
    const suits = [];
    for (let i = 0; i < row.length; i++) {
        suits.push(row[i].suit);
    }
    return this.allEqual( suits );
  }

  checkForRoyal(row: Card[]): boolean {
    const sorted = this.sortValues(row);
    if (sorted[0] === 10 && sorted[1] === 11 && sorted[2] === 12 && sorted[3] === 13 && sorted[4] === 14) {
      return true;
    }
    return false;
  }

  checkForStraight(row: Card[]): boolean {
    const sorted = this.sortValues(row);
    if (sorted[sorted.length - 1] === 14 && sorted[0] === 2 && sorted[1] === 3 && sorted[2] === 4 && sorted[3] === 5) {
      return true;
    }
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1] !== sorted[i] + 1) {
        return false;
      }
    }
    return true;
  }

  checkForThreeOfKind(row: Card[]): boolean {
    const sorted = this.sortValues(row);
    let current = null;
    let count = 0;

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== current) {
          if (count === 3) {
              console.log(current + ' comes --> ' + count + ' times');
              return true;
          }
          current = sorted[i];
          count = 1;
      } else {
          count++;
      }
    }
    // useless?
    if (count === 3) {
        console.log(current + ' comes --> ' + count + ' times');
        return true;
    }
    return false;
  }

  checkForFourOfKind(row: Card[]): boolean {
    const sorted = this.sortValues(row);
    let current = null;
    let count = 0;

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== current) {
          if (count === 4) {
              console.log(current + ' comes --> ' + count + ' times');
              return true;
          }
          current = sorted[i];
          count = 1;
      } else {
          count++;
      }
    }
    // useless?
    if (count === 4) {
        console.log(current + ' comes --> ' + count + ' times');
        return true;
    }
    return false;
  }

  checkForPairs(row: Card[]): number {
    const sorted = this.sortValues(row);
    let current = null;
    let count = 0;
    let pairs = 0;

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== current) {
          if (count === 2) {
              pairs ++;
              count = 0;
          }
          current = sorted[i];
          count = 1;
      } else {
          count++;
      }
    }
    if (count === 2) {
      pairs ++;
      count = 0;
    }

    return pairs;
  }

  sortValues(row: Card[]): number[] {
    const values = [];
    for (let i = 0; i < row.length; i++) {
      if (row[i].value === 'JACK') {
        values.push(11);
      } else if (row[i].value === 'QUEEN') {
        values.push(12);
      } else if (row[i].value === 'KING') {
        values.push(13);
      } else if (row[i].value === 'ACE') {
        values.push(14);
      } else {
        values.push(Number(row[i].value));
      }
    }

    const sorted = values.sort((n1, n2) => n1 - n2);

    return sorted;
  }

  getHand(row: Card[]): number {
    if (this.checkForFlush(row)) {
      if (this.checkForStraight(row)) {
        if (this.checkForRoyal(row)) {
          console.log('Royal Flush');
          return 9;
        } else {
          console.log('Straight Flush');
          return 8;
        }
      } else {
        console.log('Flush');
        return 5;
      }
    } else {
      if (this.checkForStraight(row)) {
        console.log('Straight');
        return 4;
      } else {
        if (this.checkForFourOfKind(row)) {
          console.log('Four of a kind');
          return 7;
        } else {
          if (this.checkForThreeOfKind(row)) {
            if (this.checkForPairs(row) === 1) {
              console.log('Full House');
              return 6;
            } else {
              console.log('Three of a kind');
              return 3;
            }
          } else {
            if (this.checkForPairs(row) === 2) {
              console.log('Two Pairs');
              return 2;
            } else if (this.checkForPairs(row) === 1) {
              console.log('A pair');
              return 1;
            } else {
              console.log('High Card');
              return 0;
            }
          }
        }
      }
    }
  }

  compareHands(top: number, middle: number, bottom: number): void {
    if (top > middle || top > bottom || middle > bottom) {
      console.log('LOST');
    } else {
      console.log('WON');
    }
  }
}
