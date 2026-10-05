import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.pokemontcg.io/v2';

  getSets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sets?orderBy=-releaseDate`);
  }

  // v2 uses a specific query format for filtering by set id
  getCardsBySet(setId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cards?q=set.id:${setId}`);
  }
}