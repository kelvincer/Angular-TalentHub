import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/UsersService';

@Component({
  selector: 'app-user-manager-page.component',
  imports: [],
  templateUrl: './user-manager-page.component.html',
  styleUrl: './user-manager-page.component.css',
})
export class UserManagerPageComponent {

  usersService = inject(UsersService)
  users = signal<User[]>([])

  constructor() {
    effect(() => {
      this.loadUsers();
    });
  }

  loadUsers() {
    this.users.set(this.usersService.loadUsers())
  }

}
