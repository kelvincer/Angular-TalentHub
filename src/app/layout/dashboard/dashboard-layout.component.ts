import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { SideBarComponent } from "../side-bar.component/side-bar.component";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet } from "@angular/router";
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
export default class DashboardLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('drawerContent', { static: false }) drawerContent!: ElementRef<HTMLElement>;

  private route = inject(ActivatedRoute)
  private usersService = inject(UsersService)
  private router = inject(Router)
  protected toastService = inject(ToastService)
  user = signal<User | undefined>(undefined)
  menuItems = signal<Menu[]>([])
  private scrollPositions = new Map<string, number>()
  private scrollPollInterval?: ReturnType<typeof setInterval>

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const url = this.router.url;
        if (this.drawerContent) {
          this.scrollPositions.set(url, this.drawerContent.nativeElement.scrollTop);
        }
      }

      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;

        if (this.drawerContent) {
          const savedPosition = this.scrollPositions.get(currentUrl) ?? 0;
          if (savedPosition > 0) {
            this.waitForContentAndRestore(savedPosition);
          } else {
            this.drawerContent.nativeElement.scrollTop = 0;
          }
        }
      }
    });

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

  ngOnDestroy(): void {
    if (this.scrollPollInterval) {
      clearInterval(this.scrollPollInterval);
    }
  }

  private waitForContentAndRestore(scrollTop: number): void {
    const el = this.drawerContent.nativeElement;
    let attempts = 0;
    const maxAttempts = 60;

    const cleanup = () => {
      if (this.scrollPollInterval) {
        clearInterval(this.scrollPollInterval);
        this.scrollPollInterval = undefined;
      }
    };

    const tryRestore = () => {
      if (el.scrollHeight >= scrollTop + el.clientHeight) {
        el.scrollTop = scrollTop;
        cleanup();
      } else if (++attempts >= maxAttempts) {
        cleanup();
      }
    };

    if (this.scrollPollInterval) {
      clearInterval(this.scrollPollInterval);
    }
    this.scrollPollInterval = setInterval(tryRestore, 50);
  }
}
