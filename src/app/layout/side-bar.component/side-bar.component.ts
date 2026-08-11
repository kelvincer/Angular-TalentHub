import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Menu } from '../../features/dashboard/models/Menu';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {

  authService = inject(AuthService)
  menu = input.required<Menu[]>()
  userName = input.required<string>()
  role = input<string>()
  computedRole = computed(() => {
    switch(this.role()) {
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
}
