/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  is-nullish.const.ts
 * File name:    is-nullish.const
 * IDE:          WebStorm
 */
export function isNullish(value?: unknown): value is null | undefined {
  return value == null;
}
