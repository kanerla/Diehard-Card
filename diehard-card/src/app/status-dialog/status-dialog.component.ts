import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-status-dialog',
  template: `<h1 mat-dialog-title>{{data.status === true ? "You won!" : "You lost."}}</h1>
  <div mat-dialog-content>
    <p>Score: {{data.points}}</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="" cdkFocusInitial>Ok</button>
  </div>`,
  styleUrls: ['./status-dialog.component.css']
})
export class StatusDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: boolean) { }

  ngOnInit(): void {
  }

}
