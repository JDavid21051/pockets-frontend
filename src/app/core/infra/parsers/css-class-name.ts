/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/3/2026
 * Module name:  css-class-name.ts
 * File name:    css-class-name.ts
 * IDE:          WebStorm
 */

import type { ClassNameArray } from '@/domain/models/ui/class-name.type';

const toValue = (mix: ClassNameArray | string | number): string => {
  if (typeof mix === 'string') return mix;
  if (typeof mix === 'number') return mix === 0 ? '' : String(mix);

  let string = '';
  for (const mixItem of mix) {
    const resolved = mixItem ? toValue(mixItem as ClassNameArray | string | number) : '';

    if (resolved) {
      if (string !== '') string += ' ';
      string += resolved;
    }
  }
  return string;
};

export const cn = (...classLists: ClassNameArray): string => {
  let string = '';

  for (const arg of classLists) {
    if (!arg && arg !== 0) continue;
    const resolved = toValue(arg as ClassNameArray | string | number);
    if (resolved) {
      if (string !== '') string += ' ';
      string += resolved;
    }
  }
  return string;
};
