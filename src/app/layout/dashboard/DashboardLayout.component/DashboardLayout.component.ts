import { Component, inject, signal } from '@angular/core';
import { SideBarComponent } from "../../side-bar.component/side-bar.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { UsersService } from '../../../features/dashboard/services/UsersService';
import { User } from '../../../features/dashboard/models/User';
import { menu, Menu } from '../../../features/dashboard/models/Menu';

@Component({
  selector: 'app-dashboard-layout.component',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './DashboardLayout.component.html',
  styleUrl: './DashboardLayout.component.css',
})
export class DashboardLayoutComponent {

  private usersService = inject(UsersService)
  user = signal<User | undefined>(undefined)
  menuItems = signal<Menu[]>([]);

  constructor(private route: ActivatedRoute) {
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
        }
      })
    })

    //const id = this.route.snapshot.paramMap.get('userId')
    //console.log("snapshot", id)
  }
}
