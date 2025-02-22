import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { Card } from '../card';
import { MatDialog } from '@angular/material/dialog';
import { StatusDialogComponent } from '../status-dialog/status-dialog.component';

@Component({
  selector: 'app-game',
  template: `
  <a routerLink="/" routerLinkActive="active"><button class="backbutton" mat-raised-button color="primary">Back</button></a>
  <table>
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
  <button class="startbutton" mat-raised-button color="primary" (click)="startGame()" [disabled]="gameStarted">{{buttonText}}</button>
</div>

<div class="bottom" *ngIf="gameStarted">
  <div>
    <img src={{card.image}} *ngIf="card" alt={{card.code}} onerror="this.src='assets/card.png'" width="95" height="125">
  </div>
  <button mat-stroked-button color="primary" (click)="placeTop()" [disabled]="topFull">Top</button>
  <button mat-stroked-button color="primary" (click)="placeMiddle()" [disabled]="middleFull">Middle</button>
  <button mat-stroked-button color="primary" (click)="placeBottom()" [disabled]="bottomFull">Bottom</button>
</div>`,
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameStarted = false;
  buttonText = 'Start game';
  topFull = false;
  middleFull = false;
  bottomFull = false;
  card: Card;
  top: Card[] = [];
  middle: Card[] = [];
  bottom: Card[] = [];
  highscores: number[] = [];

  constructor(private cardsService: CardsService, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.cardsService.fetchDeck();
  }

  drawCard(): void {
    this.cardsService.drawCard((result) => {
     this.card = result;
    });
    this.gameStarted = true;
  }

  startGame(): void {
    this.top = [];
    this.middle = [];
    this.bottom = [];
    this.topFull = false;
    this.middleFull = false;
    this.bottomFull = false;
    this.drawCard();
  }

  placeTop(): void {
    if (this.notDouble(this.card)) {
      this.top.push(this.card);
      this.drawCard();
      if (this.top.length === 3) {
        this.topFull = true;
      }
      this.gameOver();
    }
  }

  placeMiddle(): void {
    if (this.notDouble(this.card)) {
      this.middle.push(this.card);
      this.drawCard();
      if (this.middle.length === 5) {
        this.middleFull = true;
      }
      this.gameOver();
    }
  }

  placeBottom(): void {
    if (this.notDouble(this.card)) {
      this.bottom.push(this.card);
      this.drawCard();
      if (this.bottom.length === 5) {
        this.bottomFull = true;
      }
      this.gameOver();
    }
  }

  gameOver(): void {
    if (this.bottomFull && this.topFull && this.middleFull) {
      this.compareHands(this.getTopHand(this.top), this.getHand(this.middle), this.getHand(this.bottom));
    }
  }

  allEqual(arr: string[]): boolean {
    return arr.every(x => x === arr[0]);
  }

  checkForFlush(row: Card[]): boolean {
    const suits = [];
    for (let card of row) {
      suits.push(card.suit);
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

    for (let card of sorted) {
      if (card !== current) {
        if (count === 3) {
          return true;
        }
        current = card;
        count = 1;
      } else {
        count++;
      }
    }
    if (count === 3) {
      return true;
    }
    return false;
  }

  checkForFourOfKind(row: Card[]): boolean {
    const sorted = this.sortValues(row);
    let current = null;
    let count = 0;

    for (let card of sorted) {
      if (card !== current) {
        if (count === 4) {
          return true;
        }
        current = card;
        count = 1;
      } else {
        count++;
      }
    }
    if (count === 4) {
      return true;
    }
    return false;
  }

  checkForPairs(row: Card[]): number {
    const sorted = this.sortValues(row);
    let current = null;
    let count = 0;
    let pairs = 0;

    for (let card of sorted) {
      if (card !== current) {
        if (count === 2) {
          pairs ++;
          count = 0;
        }
        current = card;
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
    for (let card of row) {
      if (card.value === 'JACK') {
        values.push(11);
      } else if (card.value === 'QUEEN') {
        values.push(12);
      } else if (card.value === 'KING') {
        values.push(13);
      } else if (card.value === 'ACE') {
        values.push(14);
      } else {
        values.push(Number(card.value));
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

  getTopHand(row: Card[]): number {
    if (this.checkForThreeOfKind(row)) {
      console.log('Three of a kind');
      return 3;
    } else {
      if (this.checkForPairs(row) === 1) {
        console.log('A pair');
        return 1;
      } else {
        console.log('High Card');
        return 0;
      }
    }
  }

  compareHands(top: number, middle: number, bottom: number): void {
    let score = 0;
    if (top > middle || top > bottom || middle > bottom) {
      console.log('LOST');
      this.openDialog(false, score);
    } else {
      score = 3;

      switch (bottom) {
        case 4: {
          score += 2;
          break;
        }
        case 5: {
          score += 4;
          break;
        }
        case 6: {
          score += 6;
          break;
        }
        case 7: {
          score += 10;
          break;
        }
        case 8: {
          score += 15;
          break;
        }
        case 9: {
          score += 25;
          break;
        }
        default: {
          break;
        }
      }

      switch (middle) {
        case 3: {
          score += 2;
          break;
        }
        case 4: {
          score += 4;
          break;
        }
        case 5: {
          score += 8;
          break;
        }
        case 6: {
          score += 12;
          break;
        }
        case 7: {
          score += 20;
          break;
        }
        case 8: {
          score += 30;
          break;
        }
        case 9: {
          score += 50;
          break;
        }
        default: {
          break;
        }
      }

      this.highscores.push(score);
      console.log('WON');
      this.openDialog(true, score);
    }
  }

  openDialog(won: boolean, score: number): void {
    const sorted = this.highscores.sort((n1, n2) => n2 - n1);
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      height: '275px',
      width: '250px',
      data: {status: won, points: score, list: sorted}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.gameStarted = false;
      this.buttonText = 'Play again';
      this.cardsService.shuffleDeck();
    });
  }

  notDouble(card: Card): boolean {
    if (this.top.includes(card)) {
      return false;
    } else if (this.middle.includes(card)) {
      return false;
    } else if (this.bottom.includes(card)) {
      return false;
    }
    return true;
  }
}
