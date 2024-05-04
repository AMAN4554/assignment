import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemData } from './items-class';
 

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

 apiUrl = 'http://localhost:3000/Item'; 

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

  createItem(newItem: any) {
    const Options = this.getOptions();
    return this.http.post<ItemData[]>(this.apiUrl, newItem, Options);
  }

  updateItem(updatedItem:any) {
    const Options = this.getOptions();
    return this.http.put<ItemData[]>(this.apiUrl+'/'+updatedItem['Id'], updatedItem, Options);
  }

  deleteItem(itemId: number){
    const Options = this.getOptions();
    return this.http.delete<any>(this.apiUrl+'/'+itemId, Options);
    
  }
}

