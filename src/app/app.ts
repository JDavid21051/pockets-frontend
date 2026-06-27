import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegisterService } from '@/infra/services/icon-register.service';
import { AppThemeService } from '@/infra/services/app-theme.service';
@Component({
  selector: 'krih-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private readonly iconRegistry: IconRegisterService = inject(IconRegisterService);
  private readonly themeService: AppThemeService = inject(AppThemeService);
  constructor() {
    this.iconRegistry.register();
    this.themeService.setTheme(this.themeService.currentTheme());
  }
}
