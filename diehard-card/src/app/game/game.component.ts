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
      console.log('top:');
      console.log(this.checkForPairs(this.top));

      console.log('middle:');
      if (this.checkForFlush(this.middle)) {
        if (this.checkForStraight(this.middle)) {
          if (this.checkForRoyal(this.middle)) {
            console.log('Royal Flush');
          } else {
            console.log('Straight Flush');
          }
        } else {
          console.log('Flush');
        }
      } else {
        if (this.checkForStraight(this.middle)) {
          console.log('Straight');
        } else {
          if (this.checkForFourOfKind(this.middle)) {
            console.log('Four of a kind');
          } else {
            if (this.checkForThreeOfKind(this.middle)) {
              console.log('Three of a kind or Full House');
            } else {
              console.log('(2) pair(s) or a high card');
            }
          }
        }
      }

      console.log('bottom:');
      console.log(this.checkForPairs(this.bottom));
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
      if (sorted[i] != current) {
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
      if (sorted[i] != current) {
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

  // counts 4 of a kind as 3 pairs
  // probably counts 3 of a kind as 2 pairs
  // does not count 2 pairs (only acknowledges the first one)
  checkForPairs(row: Card[]): void {
    const sorted = this.sortValues(row);

    const pairs = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      if (sorted[i + 1] === sorted[i]) {
        pairs.push(sorted[i]);
      }
    }
    for (const num of pairs) {
      console.log(num);
    }
    console.log(pairs.length + ' pairs');
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
}
