import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);

  getSets(): Observable<any> {
    return of({
      data: [
        { id: '0', name: 'Generation 1 (Kanto)', series: 'Classic', releaseDate: '1996-02-27' },
        { id: '151', name: 'Generation 2 (Johto)', series: 'Classic', releaseDate: '1999-11-21' },
        { id: '251', name: 'Generation 3 (Hoenn)', series: 'Advance', releaseDate: '2002-11-21' },
        { id: '386', name: 'Generation 4 (Sinnoh)', series: 'Diamond & Pearl', releaseDate: '2006-09-28' }
      ]
    });
  }

  getCardsBySet(offset: string): Observable<any> {
    const limit = 50; 
    
    // Fetch directly from the live PokéAPI using the generation offset
    return this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`).pipe(
      map((response: any) => {
        // Shuffle the results
        const randomPokemon = response.results.sort(() => Math.random() - 0.5);

        // Map it into the structure our Game Board already understands
        const mappedCards = randomPokemon.map((poke: any) => {
          const pokeId = poke.url.split('/').filter(Boolean).pop();
          return {
            id: pokeId,
            images: { small: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png` }
          };
        });
        
        return { data: mappedCards };
      })
    );
  }
}