import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // Stores the configuration from the setup page
  gameConfig: any = null;

  setGameConfig(config: any) {
    this.gameConfig = config;
  }

  getGameConfig() {
    return this.gameConfig;
  }
}