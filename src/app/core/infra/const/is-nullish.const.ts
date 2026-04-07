/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/29/2026
 * Module name:  is-nullish.const.ts
 * File name:    is-nullish.const
 * IDE:          WebStorm
 */
export const isNullish = (value?: unknown): value is null | undefined => value == null
