import { Component, OnInit } from '@angular/core';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-instructions',
  template: `<div [innerHTML]="rules"></div>
  <div class="elements">
  <img src="assets/scoreboard.JPG" alt="Scoreboard"/>
  <a routerLink="/play" routerLinkActive="active"><button mat-raised-button color="primary">Play</button></a>
  </div>`,
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  rules = '';
  constructor(private rulesService: RulesService) { }

  ngOnInit(): void {
    this.rulesService.fetch((result) => {
      this.rules = result;
    });
  }

}
