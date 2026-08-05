import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/UsersService';

@Component({
  selector: 'app-delete-user',
  imports: [],
  templateUrl: './DeleteUser.component.html',
  styleUrl: './DeleteUser.component.css',
})
export class DeleteUserComponent {

  userService = inject(UsersService)
  modalOpen = input(false);
  close = output<void>();
  user = input<User>()

  closeModal() {
    this.close.emit()
  }

  deleteUser() {
    this.userService.delete(this.user()?.id ?? '').subscribe({
      next: (response) => this.closeModal(),
      error: (error) => console.log(error)
    })
  }
}
