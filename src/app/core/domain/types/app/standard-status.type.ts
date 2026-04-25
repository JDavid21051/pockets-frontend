/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  standard-status.type.ts
 * File name:    standard-status.type
 * IDE:          WebStorm
 */

export type BaseStatusType = 'success' | 'error' | 'basic';
export type StandardStatusType =
  | BaseStatusType
  | 'warning'
  | 'alert'
  | 'primary'
  | 'info'
  | 'extra'
  | 'secondary'
  | 'tertiary';
export type StandardOrCustomStatus = StandardStatusType | string;
