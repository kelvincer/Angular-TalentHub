import { Component, inject, OnInit, signal } from '@angular/core';
import { SideBarComponent } from "../side-bar.component/side-bar.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UsersService } from '../../features/dashboard/services/UsersService';
import { User } from '../../features/dashboard/models/User';
import { menu, Menu } from '../../features/dashboard/models/Menu';
import { ToastComponent } from '../../shared/toast/toast.component';
import { ToastService } from '../../features/dashboard/services/ToastService';

@Component({
  selector: 'app-dashboard-layout.component',
  imports: [SideBarComponent, RouterOutlet, ToastComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export default class DashboardLayoutComponent implements OnInit {

  private route = inject(ActivatedRoute)
  private usersService = inject(UsersService)
  protected toastService = inject(ToastService)
  user = signal<User | undefined>(undefined)
  menuItems = signal<Menu[]>([])

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userId = params.get('userId')
      this.usersService.getUsers().subscribe({
        next: (data) => {
          const user = data.find(u => {
            return u.id === userId
          })
          this.user.set(user)

          this.menuItems.set(menu.filter(m =>
            m.role.toLowerCase() === user?.role.toLowerCase())
          )
        },
        error: (error) => console.log(error)
      })
    })
  }
}
