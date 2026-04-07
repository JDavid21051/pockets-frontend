/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  standard-use-cases.port.ts
 * File name:    standard-use-cases.port
 * IDE:          WebStorm
 */

export interface BaseUseCasesPort<TParam = never, TResponse = unknown> {
  readonly execute: (...params: TParam[]) => TResponse;
}

export type BoolUseCasesPort = BaseUseCasesPort<never, boolean>;
export type StringUseCasesPort = BaseUseCasesPort<never, string>;
export type NullishStringUseCasesPort = BaseUseCasesPort<never, string | null>;
