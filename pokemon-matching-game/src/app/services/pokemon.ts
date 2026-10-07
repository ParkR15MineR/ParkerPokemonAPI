import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.pokemontcg.io/v2';

  getSets(): Observable<any> {
  // Temporarily bypassing the broken API with local mock data
  return of({
    data: [
      { id: 'sv1', name: 'Scarlet & Violet', series: 'Scarlet & Violet', releaseDate: '2023-03-31' },
      { id: 'swsh12', name: 'Silver Tempest', series: 'Sword & Shield', releaseDate: '2022-11-11' },
      { id: 'base1', name: 'Base Set', series: 'Base', releaseDate: '1999-01-09' }
    ]
  });
}

    // Add this right below your mocked getSets() method
getCardsBySet(setId: string): Observable<any> {
  // Bypassing the 502 error with reliable mock artwork
  const mockCards = [1, 4, 7, 25, 150, 133, 143, 94, 6, 9].map(num => ({
    id: `mock-${num}`,
    images: { small: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png` }
  }));

  return of({ data: mockCards });
}
}