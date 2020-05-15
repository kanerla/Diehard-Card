import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `<h1>{{title}}</h1>`,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Simplified Single-player Open-face Chinese Poker';

  constructor() { }

  ngOnInit(): void {
  }

}
