import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RulesService } from './rules.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [RulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
