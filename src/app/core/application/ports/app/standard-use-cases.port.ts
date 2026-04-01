/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  standard-use-cases.port.ts
 * File name:    standard-use-cases.port
 * IDE:          WebStorm
 */

export interface BoolUseCasesPort<T = never> {
  readonly execute: (...params: T[]) => boolean;
}
