import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/UsersService';
import { Status, User } from '../../models/User';
import { Role } from '../../../auth/models/LoggedUser';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './EditUser.component.html',
  styleUrl: './EditUser.component.css',
})
export class EditUserComponent {

  private usersService = inject(UsersService)
  readonly modalOpen = input(false);
  close = output<void>();
  readonly user = input.required<User>();
  readonly roles: Role[] = ['ADMIN', 'RECRUITER', 'CANDIDATE'];
  readonly statuses: Status[] = ['ACTIVE', 'INACTIVE']

  editUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl('')
  })

  constructor() {
    effect(() => {
      const user = this.user();

      if (user) {
        this.editUserForm.patchValue({
          name: user.name ?? '',
          email: user.email ?? '',
          role: user.role ?? '',
          status: user.status ?? ''
        });
      }
    })
  }

  closeModal() {
    this.close.emit()
  }

  updateUser() {

    const currentUser = this.user()
    if (!currentUser)
      return

    const u: Partial<User> = {
      name: this.editUserForm.value.name ?? '',
      email: this.editUserForm.value.email ?? '',
      role: this.editUserForm.value.role as User['role'],
      status: this.editUserForm.value.status as User['status'],
      createdAt: currentUser.createdAt
    }

    this.usersService.update(currentUser.id, { ...currentUser, ...u }).subscribe({
      next: () => {
        this.closeModal()
      },
      error: err => console.error(err)
    })

  }
}
