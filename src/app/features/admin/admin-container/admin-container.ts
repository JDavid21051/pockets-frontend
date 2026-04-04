import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ResponsiveControlService } from '@/infra/service/responsive-control.service';
import { APP_MENU_MODULES } from '@/infra/const/app-menu-modules.const';
import { PanelMainMenu } from '@/shared/ui/layout/panel-main-menu/panel-main-menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'krih-admin-container',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    PanelMainMenu,
    RouterOutlet,
  ],
  templateUrl: './admin-container.html',
  styleUrl: './admin-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContainer {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly responsiveService: ResponsiveControlService = inject(ResponsiveControlService);
  protected readonly menuItems = APP_MENU_MODULES;
  protected readonly isResponsive = this.responsiveService.isResponsive;
  readonly sidebarOpen = signal(false);

  onToggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
    this.cdr.detectChanges();
  }
}
