import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game';
import { PokemonService } from '../../services/pokemon';
import { Router } from 'express';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class GameComponent implements OnInit {
  private gameService = inject(GameService);
  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  
  boardCards: any[] = [];
  flippedCards: any[] = [];
  lockBoard: boolean = false; 

  // Multiplayer State Variables
  players: { name: string, score: number }[] = [];
  currentPlayerIndex: number = 0;

  ngOnInit() {
    const config = this.gameService.getGameConfig();
    const matchCount = config ? config.matchCount : 6; 
    const setId = config ? config.selectedSet : 'base1';
    const playerCount = config ? config.playerCount : 1;

    // Initialize our players array
    for (let i = 0; i < playerCount; i++) {
      this.players.push({ name: `Player ${i + 1}`, score: 0 });
    }

    this.pokemonService.getCardsBySet(setId).subscribe(response => {
      const uniqueCards = response.data.slice(0, matchCount);
      const pairs = [...uniqueCards, ...uniqueCards];

      this.boardCards = pairs
        .sort(() => Math.random() - 0.5)
        .map((card, index) => ({
          boardId: index,        
          cardId: card.id,       
          imageUrl: card.images.small, 
          isFlipped: false,
          isMatched: false
        }));
    });
  }

  flipCard(card: any) {
    if (this.lockBoard || card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.lockBoard = true;
      this.checkForMatch();
    }
  }

  checkForMatch() {
    const [card1, card2] = this.flippedCards;

    if (card1.cardId === card2.cardId) {
      // Match found! Award a point, and they keep their turn.
      card1.isMatched = true;
      card2.isMatched = true;
      this.players[this.currentPlayerIndex].score++;
      this.resetTurn();
    } else {
      // No match. Wait 1 second, flip back, and pass the turn.
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.passTurn();
        this.resetTurn();
      }, 1000);
    }
  }

  passTurn() {
    // Moves to the next player, and loops back to 0 if at the end of the array
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
  }

  resetTurn() {
    this.flippedCards = [];
    this.lockBoard = false;
  }

  goToSetup() {
    this.router.navigate(['/setup']);
  }
}