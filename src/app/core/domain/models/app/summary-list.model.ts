/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/12/2026
 * Module name:  summary-list.model.ts
 * File name:    summary-list.model
 * IDE:          WebStorm
 */

export interface SummaryListModel<T extends string | number> {
  name: string;
  id: T;
}
