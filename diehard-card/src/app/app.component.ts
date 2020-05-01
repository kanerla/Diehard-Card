import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-header></app-header>
  <div><router-outlet></router-outlet></div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }
}
