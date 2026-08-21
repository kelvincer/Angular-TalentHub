import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Menu } from '../../features/dashboard/models/Menu';
import { UsersService } from '../../features/dashboard/services/UsersService';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {

  private router = inject(Router)
  private usersService = inject(UsersService)
  menu = input.required<Menu[]>()
  userName = input.required<string>()
  role = input<string>()
  computedRole = computed(() => {
    switch (this.role()) {
      case 'ADMIN':
        return 'Administrador'
      case 'RECRUITER':
        return 'Reclutador'
      case 'CANDIDATE':
        return 'Candidato'
      default:
        return ''
    }
  })

  logout() {
    this.usersService.removeSessionKey()
    this.router.navigateByUrl('');
  }
}
