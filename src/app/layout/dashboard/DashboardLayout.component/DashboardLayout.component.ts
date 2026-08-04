import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideBarComponent } from "../../side-bar.component/side-bar.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-dashboard-layout.component',
  imports: [SideBarComponent, RouterOutlet],
  templateUrl: './DashboardLayout.component.html',
  styleUrl: './DashboardLayout.component.css',
})
export class DashboardLayoutComponent {}
