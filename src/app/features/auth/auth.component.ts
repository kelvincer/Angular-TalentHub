import { Component, inject, model, signal } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../dashboard/services/UsersService';
import { Role } from './models/LoggedUser';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {

  private authService = inject(AuthService)
  private usersService = inject(UsersService)
  private router = inject(Router)
  email = model('')
  password = model('')
  isSubmiting = signal(false)
  onSubmitError = signal(false)

  loginUser() {
    this.isSubmiting.set(true)
    this.onSubmitError.set(false)
    this.authService.authenticated(this.email(), this.password()).subscribe({
      next: (user) => {
        if (!user) {
          this.onSubmitError.set(true)
          this.isSubmiting.set(false)
          return
        }

        this.usersService.saveUser(user)
        this.router.navigate(['/dashboard', user.id])
      },
      error: (error) => {
        console.log(error)
        this.isSubmiting.set(false)
        this.onSubmitError.set(true)
      }
    })
  }

  fill(role: Role): void {
    const creds: Record<Role, { email: string; password: string }> = {
      ADMIN: { email: 'admin@talenthub.com', password: 'admin123' },
      RECRUITER: { email: 'reclutador@talenthub.com', password: 'reclutador123' },
      CANDIDATE: { email: 'candidato@talenthub.com', password: 'candidato123' },
    };
    this.email.set(creds[role].email)
    this.password.set(creds[role].password)
  }

}
