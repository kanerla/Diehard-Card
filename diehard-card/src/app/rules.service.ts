import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetch(callBackFunction: (result: string) => void): void {
    this.http.get('assets/rulebook.txt', {responseType: 'text'})
    .subscribe(data => {
      callBackFunction(data);
    });
  }
}
