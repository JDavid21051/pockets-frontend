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

@Component({
  selector: 'krih-admin-container',
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule],
  templateUrl: './admin-container.html',
  styleUrl: './admin-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminContainer {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly responsiveService: ResponsiveControlService = inject(ResponsiveControlService);
  readonly sidebarOpen = signal(false);
  readonly isResponsive = this.responsiveService.isResponsive;

  onToggleSidebar(): void {
    this.sidebarOpen.set(!this.sidebarOpen());
    this.cdr.detectChanges();
  }
}
