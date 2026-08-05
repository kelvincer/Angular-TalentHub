import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/UsersService';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './EditUser.component.html',
  styleUrl: './EditUser.component.css',
})
export class EditUserComponent {

  usersService = inject(UsersService)
  modalOpen = input(false);
  close = output<void>();
  user = input<User>();
  roles = ['Administrador', 'Reclutador', 'Candidato'];
  states = ['Activo', 'Inactivo']

  editUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl('')
  })

  constructor() {
    effect(() => {
      this.editUserForm.patchValue({
        name: this.user()?.name ?? '',
        email: this.user()?.email ?? '',
        role: this.user()?.role ?? '',
        status: this.user()?.status ?? ''
      });
    });
  }

  closeModal() {
    this.close.emit()
  }

  updateUser() {
    const u: User = {
      id: this.user()?.id ?? '',
      name: this.editUserForm.value.name ?? '',
      email: this.editUserForm.value.email ?? '',
      role: this.editUserForm.value.role as User['role'],
      status: this.editUserForm.value.status as User['status'],
      createdAt: this.user()?.createdAt ?? new Date()
    }

    this.usersService.update(u.id, u).subscribe({
      next: (response) => {
        console.log(response)
        this.closeModal()
      },
      error: err => console.error(err)
    })

  }
}
