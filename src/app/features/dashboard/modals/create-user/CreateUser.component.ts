import { Component, inject, input, output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/UsersService';
import { User } from '../../models/User';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule],
  templateUrl: './CreateUser.component.html',
  styleUrl: './CreateUser.component.css',
})
export class CreateUserComponent {

  modalOpen = input(false);
  close = output<void>();
  userService = inject(UsersService)
  createUserForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    state: new FormControl('')
  })

  closeModal() {
    this.createUserForm.reset()
    this.close.emit()
  }

  handleSubmit() {
    const name = this.createUserForm.value.name ?? '';
    const email = this.createUserForm.value.email ?? '';
    const role = this.createUserForm.value.role as User['role'];
    const status = this.createUserForm.value.state as User['status'];

    console.log(name + ' | ' + email + ' | ' + role + ' | ' + status);
    this.userService.create(
      {
        "id": '',
        "name": name,
        "email": email,
        "role": role,
        "status": status,
        "createdAt": new Date()
      }
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.close.emit();
      }
    })
  }
}
