import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveControlService } from '@/infra/services/responsive-control.service';
import { RouterOutlet } from '@angular/router';
import { cn } from '@/infra/parsers/css-class-name';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MainSidebarController } from '@/infra/services/main-sidebar-control.service';
import { MainSidebar } from '@/features/main/main-sidebar/main-sidebar';

@Component({
  selector: 'krih-admin-container',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonToggleModule,
    MainSidebar,
    RouterOutlet,
  ],
  templateUrl: './admin-container.html',
  styleUrl: './admin-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContainer {
  private readonly responsiveService: ResponsiveControlService = inject(ResponsiveControlService);
  private readonly sidebarController: MainSidebarController = inject(MainSidebarController);
  protected readonly isResponsive = this.responsiveService.isResponsive;
  protected readonly cn = cn;
  readonly sidebarOpen = this.sidebarController.state;

  onToggleSidebar(): void {
    this.sidebarController.toggleState();
  }
}
