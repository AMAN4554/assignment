import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemData } from './items-class';
 

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private apiUrl = 'http://localhost:3000/item'; 

  constructor(private http: HttpClient) {}
  getOptions(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return httpOptions;
  }

  getItems(): Observable<ItemData[]> {
    return this.http.get<any>(this.apiUrl);
  }

  createItem(newItem: ItemData[]): Observable<ItemData[]> {
    const Options = this.getOptions();
    return this.http.post<ItemData[]>(this.apiUrl, newItem, Options);
  }

  updateItem(updatedItem:any): Observable<ItemData[]> {
    const Options = this.getOptions();
    return this.http.put<ItemData[]>(`${this.apiUrl}/${updatedItem['Id']}`, updatedItem, Options);
  }

  deleteItem(itemId: number): Observable<any> {
    const Options = this.getOptions();
    return this.http.delete(`${this.apiUrl}/${itemId}`, Options);
  }
}

