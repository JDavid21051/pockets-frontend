/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/3/2026
 * Module name:  icon-register.service.ts
 * File name:    icon-registrer.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconRegisterService {
  private iconRegistry: MatIconRegistry = inject(MatIconRegistry);
  private sanitizer: DomSanitizer = inject(DomSanitizer);
  private readonly iconsToRegister: [name: string, path: string][] = [
    ['home', 'icons/home.svg'],
    ['dashboard', 'icons/dashboard.svg'],
    ['lock', 'icons/lock.svg'],
    ['visibility', 'icons/visibility.svg'],
    ['visibility_off', 'icons/visibility_off.svg'],
    ['person', 'icons/person.svg'],
    ['account_balance', 'icons/account_balance.svg'],
    ['close', 'icons/close.svg'],
    ['check', 'icons/check.svg'],
    ['notifications', 'icons/notifications.svg'],
    ['arrow_circle_left', 'icons/arrow_circle_left.svg'],
    ['arrow_circle_right', 'icons/arrow_circle_right.svg'],
    ['more_vert', 'icons/more_vert.svg'],
    ['delete', 'icons/delete.svg'],
    ['edit', 'icons/edit.svg'],
    ['cached', 'icons/cached.svg'],
    ['id_card', 'icons/id_card.svg'],
    ['tag', 'icons/tag.svg'],
    ['badge', 'icons/badge.svg'],
  ];

  register(): void {
    for (const [name, path] of this.iconsToRegister) {
      this.iconRegistry.addSvgIcon(name, this.sanitizer.bypassSecurityTrustResourceUrl(path));
    }
  }
}
