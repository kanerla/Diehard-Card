import { Component, OnInit } from '@angular/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'app-root',
  template: `<h1>{{title}}</h1>
  <div [innerHTML]="rules"></div>
  <img src="assets/scoreboard.JPG" alt="Scoreboard"/>
  <button mat-raised-button color="primary">Play</button>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Single-player Open-face Chinese Poker';
  rules = ""

  constructor(private rulesService : RulesService) {

  }

  ngOnInit(): void {
    this.rulesService.fetch((result) => {
      this.rules = result
    })
  }
}
