import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { cn } from '@/infra/parsers/css-class-name';
import { MatTooltip } from '@angular/material/tooltip';
import { APP_MENU_THEME_CONST } from '@/infra/const/app-menu-theme.const';
import { AppThemeService } from '@/infra/services/app-theme.service';
import type { ThemeMenuItemModel } from '@/domain/models/app/app-theme.model';

@Component({
  selector: 'krih-theme-control',
  imports: [MatIcon, TranslatePipe, MatTooltip],
  templateUrl: './theme-control.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeControl {
  private themeService = inject(AppThemeService);
  protected readonly cn = cn;
  readonly themesList = APP_MENU_THEME_CONST;
  readonly themeSelected = this.themeService.currentTheme;

  onClickChangeTheme(themeData: ThemeMenuItemModel): void {
    this.themeService.setTheme(themeData.themeId);
  }
}
