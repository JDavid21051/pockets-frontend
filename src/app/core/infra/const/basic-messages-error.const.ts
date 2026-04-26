/*
 * Developed by CQ Inversiones SAS. Copyright (c) 2025. All rights reserved.
 * Desarrollado por CQ Inversiones SAS. Copyright (c) 2025. Todos los derechos reservados.
 */

/*
 * Project:      biodiv-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         11/22/2025
 * Module name:  basic-messages-error.const
 * File name:    basic-messages-error.const.ts
 * IDE:          WebStorm
 */

import type { MsmErrorFn, MsmErrorsType } from '@/domain/types/app/msm-error-fn.type';

export const whitespaces: MsmErrorFn = () => 'shared.text.errors.basic.whitespace';

export const minlength: MsmErrorFn = () => 'shared.text.errors.minlength';

export const maxlength: MsmErrorFn = () => 'shared.text.errors.maxlength';

export const required: MsmErrorFn = () => 'shared.text.errors.required';

export const pattern: MsmErrorFn = () => 'shared.text.errors.validations.basic.pattern';

export const BasicMessagesError: MsmErrorsType = {
  whitespaces,
  minlength,
  maxlength,
  required,
  pattern,
};

export const errorsWithParams: string[] = ['minlength', 'maxlength'];
