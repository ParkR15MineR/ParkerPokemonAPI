import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';
import { PokemonService } from '../../services/pokemon';
import { Router } from '@angular/router';
import { GameService } from '../../services/game';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './setup.html',
  styleUrl: './setup.css'
})
export class SetupComponent implements OnInit {
  private authService = inject(AuthService);
  private pokemonService = inject(PokemonService);
  private gameService = inject(GameService);
  private router = inject(Router);

  availableUsers: any[] = [];
  pokemonSets: any[] = [];

  // Form State Variables
  playerCount: number = 1;
  matchCount: number = 4;
  selectedSet: string = '';
  selectedOpponents: any[] = [];

  async ngOnInit() {
    try {
      this.availableUsers = await this.authService.getAllUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
    }

    this.pokemonService.getSets().subscribe({
      next: (response) => {
        this.pokemonSets = response.data;
      },
      error: (err) => {
        console.error('Error fetching Pokémon sets:', err);
      }
    });
  }

  startGame() {
    const config = {
      playerCount: this.playerCount,
      matchCount: this.matchCount,
      selectedSet: this.selectedSet,
      selectedOpponents: this.selectedOpponents
    };
    this.gameService.setGameConfig(config);
    this.router.navigate(['/game']);
  }
}