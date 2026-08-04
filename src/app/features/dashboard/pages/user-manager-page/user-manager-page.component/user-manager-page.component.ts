import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../models/User';
import { UsersService } from '../../../services/UsersService';
import { CreateUserComponent } from "../../../modals/create-user/CreateUser.component";
import { DeleteUserComponent } from "../../../modals/delete-user/DeleteUser.component/DeleteUser.component";
import { EditUserComponent } from "../../../modals/edit-user/EditUser.component/EditUser.component";

@Component({
  selector: 'app-user-manager-page.component',
  imports: [CreateUserComponent, DeleteUserComponent, EditUserComponent],
  templateUrl: './user-manager-page.component.html',
  styleUrl: './user-manager-page.component.css',
})
export class UserManagerPageComponent implements OnInit {

  usersService = inject(UsersService)
  users = signal<User[]>([])
  isCreateUserModalOpen = signal(false)
  isDeleteUserModalOpen = signal(false)
  isEditUserModalOpen = signal(false)

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching data', err)
    })
  }

  openModal() {
    this.isCreateUserModalOpen.set(true);
    console.log("open modal");
  }

  closeModal() {
    this.isCreateUserModalOpen.set(false);
    this.loadUsers();
  }

  openDeleteUserModal() {
    this.isDeleteUserModalOpen.set(true);
  }

  closeDeleteUserModal() {
    this.isDeleteUserModalOpen.set(false);
    this.loadUsers();
  }

  openEditUserModal() {
    this.isEditUserModalOpen.set(true);
  }

  closeEditUserModal() {
    this.isEditUserModalOpen.set(false);
    this.loadUsers();
  }
}
