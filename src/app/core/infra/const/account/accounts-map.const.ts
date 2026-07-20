/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         6/29/2026
 * Module name:  accounts-map.const.ts
 * File name:    accounts-map.const
 * IDE:          WebStorm
 */

import { AccountCurrencyEnum, AccountTypeEnum } from '@/domain/enums/accounts/accounts.enums';
import type { SummaryListModel } from '@/domain/models/app/summary-list.model';

export const ACCOUNT_TYPE_MAP: Record<AccountTypeEnum, string> = {
  [AccountTypeEnum.Credit]: 'account.type.credit',
  [AccountTypeEnum.Current]: 'account.type.current',
  [AccountTypeEnum.Savings]: 'account.type.saving',
};

export const ACCOUNT_TYPE_LIST: SummaryListModel<AccountTypeEnum>[] = Object.keys(
  ACCOUNT_TYPE_MAP,
).map((valueItem): SummaryListModel<AccountTypeEnum> => {
  const item = valueItem as unknown as AccountTypeEnum;
  return {
    id: item,
    name: ACCOUNT_TYPE_MAP[item],
  };
});

export const ACCOUNT_CURRENCY_SYMBOL_MAP: Record<AccountCurrencyEnum, string> = {
  [AccountCurrencyEnum.USD]: 'USD',
  [AccountCurrencyEnum.COP]: ' COP',
};

export const ACCOUNT_CURRENCY_NAME_MAP: Record<AccountCurrencyEnum, string> = {
  [AccountCurrencyEnum.USD]: 'account.currency.usd',
  [AccountCurrencyEnum.COP]: 'account.currency.cop',
};

export const ACCOUNT_CURRENCY_TYPE: SummaryListModel<AccountCurrencyEnum>[] = Object.keys(
  ACCOUNT_CURRENCY_NAME_MAP,
).map((valueItem): SummaryListModel<AccountCurrencyEnum> => {
  const itemKey = valueItem as unknown as AccountCurrencyEnum;

  return {
    id: itemKey,
    name: ACCOUNT_CURRENCY_NAME_MAP[itemKey],
  };
});
