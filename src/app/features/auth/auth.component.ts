import { Component, inject, model, signal } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {

  private authService = inject(AuthService)
  private router = inject(Router)
  email = model('')
  password = model('')

  navigateToDashboard() {
    console.log(this.email(), this.password())

    this.authService.getUsers().subscribe({
      next: (data) => {
        const user = data.find(u => {
          console.log("user 1", u)
          return u.email === this.email() && u.password === this.password()
        })

        console.log("user", user)

        if (user) {
          this.router.navigate(['/dashboard'])
        } else {
          console.log("User can't authenticated")
        }
      },
      error: (error) => console.log(error)
    })
  }

}
