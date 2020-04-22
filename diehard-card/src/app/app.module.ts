import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RulesService } from './rules.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [RulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
