import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { PokemonService } from '../../services/pokemon';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './setup.html',
  styleUrl: './setup.css'
})
export class SetupComponent implements OnInit {
  private authService = inject(AuthService);
  private pokemonService = inject(PokemonService);

  availableUsers: any[] = [];
  pokemonSets: any[] = [];

  async ngOnInit() {
    // Fetch previously logged-in users from Firebase
    try {
      this.availableUsers = await this.authService.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    // Fetch card sets from the Pokemon TCG API
    this.pokemonService.getSets().subscribe({
      next: (data) => {
        this.pokemonSets = data.sets; 
      },
      error: (err) => {
        console.error('Error fetching Pokémon sets:', err);
      }
    });
  }
}