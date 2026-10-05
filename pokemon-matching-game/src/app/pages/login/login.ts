import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  async handleLogin() {
    await this.authService.loginWithGoogle();
    // Routes to the setup page once we build it
    this.router.navigate(['/setup']);
  }
}3-33333