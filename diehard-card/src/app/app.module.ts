import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RulesService } from './rules.service';
import { CardsService } from './cards.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes, Router } from '@angular/router';
import { GameComponent } from './game/game.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { HeaderComponent } from './header/header.component';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';

const appRoutes: Routes = [
  { path: 'play', component: GameComponent },
  { path: '', component: InstructionsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    InstructionsComponent,
    HeaderComponent,
    StatusDialogComponent
  ],
  entryComponents: [
    StatusDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  providers: [RulesService, CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
