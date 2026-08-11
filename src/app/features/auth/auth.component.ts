import { Component, inject, model, signal } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../dashboard/services/UsersService';
import { RoleStateService } from '../dashboard/services/RoleStateService';
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
  private roleService = inject(RoleStateService)
  private router = inject(Router)
  email = model('')
  password = model('')
  isSubmiting = signal(false)
  onSubmitError = signal(false)

  loginUser() {
    console.log(this.email(), this.password())
    this.isSubmiting.set(true)
    this.onSubmitError.set(false)
    this.authService.getUsers().subscribe({
      next: (data) => {
        const loggedUser = data.find(u => {
          return u.email === this.email() && u.password === this.password()
        })

        console.log("user", loggedUser)

        if (!loggedUser) {
          this.onSubmitError.set(true)
          this.isSubmiting.set(false)
          return
        }

        this.usersService.getUsers().subscribe({
          next: (data) => {
            const user = data.find(u => {
              return u.email === loggedUser?.email
            })

            this.roleService.role.set(user?.role)

            if (user) {
              this.router.navigate(['/dashboard', user.id])
            } else {
              console.log("User can't authenticated")
            }
          },
          error: (error) => {
            this.isSubmiting.set(false)
            this.onSubmitError.set(true)
            console.log(error)
          }
        })
      },
      error: (error) => {
        this.isSubmiting.set(false)
        this.onSubmitError.set(true)
        console.log(error)
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
