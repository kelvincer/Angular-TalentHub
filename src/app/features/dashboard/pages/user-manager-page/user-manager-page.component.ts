import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../services/UsersService';
import { CreateUserComponent } from "../../modals/create-user/CreateUser.component";
import { DeleteUserComponent } from '../../modals/delete-user/DeleteUser.component';
import { EditUserComponent } from '../../modals/edit-user/EditUser.component';
import { Role } from '../../../auth/models/LoggedUser';

@Component({
  selector: 'app-user-manager-page.component',
  imports: [CreateUserComponent, DeleteUserComponent, EditUserComponent],
  templateUrl: './user-manager-page.component.html',
  styleUrl: './user-manager-page.component.css',
})
export default class UserManagerPageComponent implements OnInit {

  private usersService = inject(UsersService)
  readonly users = signal<User[]>([])
  readonly isUserCreateModalOpen = signal(false)
  readonly isUserDeleteModalOpen = signal(false)
  readonly isUserEditModalOpen = signal(false)
  readonly selectedUserEdit = signal<User | undefined>(undefined)
  readonly selectedUserDelete = signal<User | undefined>(undefined)
  readonly search = signal('')
  readonly roleFilter = signal('Todos')
  readonly roles: (Role | 'Todos')[] = ['Todos', 'ADMIN', 'RECRUITER', 'CANDIDATE']

  filteredUsers = computed(() => {
    const texto = this.search().toLowerCase().trim();
    const rol = this.roleFilter();

    return this.users().filter(user => {
      const matchesText = !texto || user.name.toLowerCase().includes(texto);
      const matchesRole = rol === 'Todos' || user.role === rol;
      return matchesText && matchesRole;
    });
  });

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().subscribe({
      next: (data) => this.users.set(data),
      error: (err) => console.error('Error fetching data', err)
    })
  }

  openModal() {
    this.isUserCreateModalOpen.set(true);
  }

  closeModal() {
    this.isUserCreateModalOpen.set(false);
    this.loadUsers();
  }

  openDeleteUserModal(id: string) {
    this.isUserDeleteModalOpen.set(true);
    this.selectedUserDelete.set(this.users().find((item) => {
      return item.id === id
    }))
  }

  closeDeleteUserModal() {
    this.isUserDeleteModalOpen.set(false);
    this.loadUsers();
  }

  openEditUserModal(id: string) {
    this.isUserEditModalOpen.set(true)
    this.selectedUserEdit.set(this.users().find((item) => {
      return item.id === id
    }))
  }

  closeEditUserModal() {
    this.isUserEditModalOpen.set(false)
    this.loadUsers()
  }
}
