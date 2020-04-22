import { Component, OnInit } from '@angular/core';
import { RulesService } from './rules.service';

@Component({
  selector: 'app-root',
  template: `<h1>Instructions</h1>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'diehard-card';
  constructor(rulesService : RulesService) {
    // do the fetch
  }

  ngOnInit(): void {

  }
}
