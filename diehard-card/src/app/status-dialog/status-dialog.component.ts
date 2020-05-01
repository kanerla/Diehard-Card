import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-dialog',
  template: `<h1>Did you win?</h1>`,
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
