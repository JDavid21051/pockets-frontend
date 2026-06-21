import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { cn } from '@/infra/parsers/css-class-name';
import { PanelMainMenu } from '@/shared/ui/modules/panel-main-menu/panel-main-menu';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MainSidebarController } from '@/infra/services/main-sidebar-control.service';
import { ResponsiveControlService } from '@/infra/services/responsive-control.service';
import { APP_MENU_MODULES } from '@/infra/const/app-menu-modules.const';
import { MainLanguageControl } from '@/features/main/main-language-control/main-language-control';

@Component({
  selector: 'krih-main-sidebar',
  imports: [PanelMainMenu, MatMenuModule, MatIcon, MainLanguageControl],
  templateUrl: './main-sidebar.html',
  styleUrl: './main-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSidebar {
  private readonly responsiveService: ResponsiveControlService = inject(ResponsiveControlService);
  private readonly sidebarController: MainSidebarController = inject(MainSidebarController);
  protected readonly menuItems = APP_MENU_MODULES;
  protected readonly isResponsive = this.responsiveService.isResponsive;
  protected readonly cn = cn;
  readonly sidebarOpen = this.sidebarController.state;
}
