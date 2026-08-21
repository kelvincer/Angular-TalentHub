import { Component, inject, input, output } from '@angular/core';
import { KeyValuePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/UsersService';
import { User } from '../../models/User';
import { ToastService } from '../../services/ToastService';
import { Role } from '../../../auth/type/Role';
import { ROLE_LABELS, STATUS_LABELS } from '../../utils/label';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './CreateUser.component.html',
  styleUrl: './CreateUser.component.css',
})
export class CreateUserComponent {

  private toastService = inject(ToastService)
  private readonly userService = inject(UsersService)
  readonly modalOpen = input(false);
  readonly close = output<void>();
  readonly roles = ROLE_LABELS
  readonly statuses = STATUS_LABELS
  readonly createUserForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required]),
    role: new FormControl<string>('', [Validators.required]),
    state: new FormControl<string>('', [Validators.required])
  });

  setFormInitialValues() {
    this.createUserForm.reset({
      name: '',
      email: '',
      password: '',
      role: '',
      state: ''
    });
  }

  closeModal() {
    this.setFormInitialValues()
    this.close.emit()
  }

  handleSubmit() {
    if (this.createUserForm.invalid) {
      this.toastService.show('Completa el nombre, el correo y la contraseña.', 'alert-error')
      return
    }

    const name = this.createUserForm.value.name ?? ''
    const email = this.createUserForm.value.email ?? ''
    const password = this.createUserForm.value.password ?? ''
    const role = this.createUserForm.value.role as Role
    const status = this.createUserForm.value.state as User['status']

    this.userService.create(
      {
        "id": '',
        "name": name,
        "email": email,
        "password": password,
        "role": role,
        "status": status,
        "createdAt": new Date()
      }
    ).subscribe({
      next: () => {
        this.toastService.show('Usuario creado.')
        this.setFormInitialValues()
        this.close.emit();
      },
      error: (error) => console.log(error)
    })
  }
}
