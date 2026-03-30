/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  encode-handler.class.ts
 * File name:    encode-handler.class
 * IDE:          WebStorm
 */

export default class EncodeHandlerClass {
  static encode<T extends object>(state: T): string | null {
    try {
      return btoa(JSON.stringify(state));
    } catch {
      return null;
    }
  }

  static decode<T extends object>(state: string): T | null {
    try {
      return JSON.parse(atob(state)) as T;
    } catch {
      return null;
    }
  }
}
