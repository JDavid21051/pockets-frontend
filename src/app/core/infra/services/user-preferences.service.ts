/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/21/2026
 * Module name:  main-sidebar-control.service.ts
 * File name:    main-sidebar-control.service
 * IDE:          WebStorm
 */

import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserPreferencesService {
  readonly #sidebarOpen = signal(false);
  readonly #blockState = signal(false);
  readonly state = this.#sidebarOpen.asReadonly();

  toggleState(): void {
    if (this.#blockState()) return;
    this.#sidebarOpen.set(!this.#sidebarOpen());
  }

  changeStatus(newState: boolean): void {
    if (this.#blockState()) return;
    this.#sidebarOpen.set(newState);
  }
}
