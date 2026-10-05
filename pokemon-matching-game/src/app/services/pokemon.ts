import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.pokemontcg.io/v1';

  // Gets all available Pokémon card sets
  getSets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sets`); //[cite: 2]
  }

  // Gets all cards belonging to a specific set
  getCardsBySet(setCode: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cards?setCode=${setCode}`); //[cite: 2]
  }
}