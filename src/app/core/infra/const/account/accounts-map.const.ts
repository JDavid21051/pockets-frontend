/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/29/2026
 * Module name:  accounts-map.const.ts
 * File name:    accounts-map.const
 * IDE:          WebStorm
 */

import { AccountCurrencyEnum, AccountTypeEnum } from '@/domain/enums/accounts/accounts.enums';

export const ACCOUNT_TYPE_MAP: Record<AccountTypeEnum, string> = {
  [AccountTypeEnum.Credit]: 'Credito',
  [AccountTypeEnum.Current]: 'Corriente',
  [AccountTypeEnum.Savings]: 'Ahorro',
};

export const ACCOUNT_CURRENCY_SYMBOL_MAP: Record<AccountCurrencyEnum, string> = {
  [AccountCurrencyEnum.USD]: '$',
  [AccountCurrencyEnum.COP]: ' COP',
};

export const ACCOUNT_CURRENCY_NAME_MAP: Record<AccountCurrencyEnum, string> = {
  [AccountCurrencyEnum.USD]: 'Dolar',
  [AccountCurrencyEnum.COP]: 'Peso Colombiano',
};
