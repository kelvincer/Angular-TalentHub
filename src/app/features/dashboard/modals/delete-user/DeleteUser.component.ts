import { Component, computed, inject, input, output } from '@angular/core';
import { UsersService } from '../../services/UsersService';
import { User } from '../../models/User';

@Component({
  selector: 'app-delete-user',
  templateUrl: './DeleteUser.component.html',
  styleUrl: './DeleteUser.component.css',
})
export class DeleteUserComponent {

  private readonly userService = inject(UsersService)
  readonly userId = computed(() => this.userService.currentUser()?.id)
  modalOpen = input(false);
  close = output<void>();
  user = input<User>()

  closeModal() {
    this.close.emit()
  }

  deleteUser() {
    const id = this.user()?.id
    if (!id)
      return

    this.userService.delete(id).subscribe({
      next: () => this.closeModal(),
      error: (error) => console.log(error)
    })
  }
}
