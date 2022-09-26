import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'src/Config';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url = Config.url
  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get(this.url+'/api/item?size=10&page=0').pipe();
  }
}
