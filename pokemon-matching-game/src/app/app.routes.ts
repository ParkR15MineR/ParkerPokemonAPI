import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { SetupComponent } from './pages/setup/setup';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'setup', component: SetupComponent }
];