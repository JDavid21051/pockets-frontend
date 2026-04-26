/*
 * Developed by CQ Inversiones SAS. Copyright (c) 2025. All rights reserved.
 * Desarrollado por CQ Inversiones SAS. Copyright (c) 2025. Todos los derechos reservados.
 */

/*
 * Project:      biodiv-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         11/22/2025
 * Module name:  msm-error-fn.type
 * File name:    msm-error-fn.type.ts
 * IDE:          WebStorm
 */

export type MsmErrorFn = () => string;
export type MsmErrorsType = Record<string, MsmErrorFn | string>;
