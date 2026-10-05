import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SetupComponent } from './pages/setup/setup';
import { GameComponent } from './pages/game/game';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'setup', component: SetupComponent },
  { path: 'game', component: GameComponent }
];