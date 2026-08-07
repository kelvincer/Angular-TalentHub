import { Component, inject, model, signal } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../dashboard/services/UsersService';
import { RoleStateService } from '../dashboard/services/RoleStateService';

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

  navigateToDashboard() {
    console.log(this.email(), this.password())

    this.authService.getUsers().subscribe({
      next: (data) => {
        const loggedUser = data.find(u => {
          return u.email === this.email() && u.password === this.password()
        })

        console.log("user", loggedUser)

        if (!loggedUser) {
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
          }
        })
      },
      error: (error) => console.log(error)
    })
  }

}
