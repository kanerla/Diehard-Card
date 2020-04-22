import { Component, OnInit } from '@angular/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'app-root',
  template: `<h1>Instructions</h1>
  <div>{{rules}}</div>
  <button mat-raised-button color="primary">Play</button>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'diehard-card';
  rules = ""

  constructor(private rulesService : RulesService) {

  }

  ngOnInit(): void {
    this.rulesService.fetch((result) => {
      this.rules = result
    })
  }
}
