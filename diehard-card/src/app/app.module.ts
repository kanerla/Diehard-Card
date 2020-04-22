import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RulesService } from './rules.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RulesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
