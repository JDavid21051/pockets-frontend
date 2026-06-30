import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { AccountsStore } from '@/application/store/accounts.store';
import type { SkyColumnsConfig } from '@/domain/models/uix/sky-table.model';
import type { SkyTableActionsType } from '@/domain/types/uix/table.type';
import { StandardModuleHeader } from '@/shared/ui/modules/standard-header/standard-header';
import { SpinnerDirective } from '@/infra/directives/spinner.directive';
import { SkyTable } from '@/shared/ui/organisms/sky-table/sky-table';
import {
  ACCOUNT_CURRENCY_SYMBOL_MAP,
  ACCOUNT_TYPE_MAP,
} from '@/infra/const/account/accounts-map.const';

@Component({
  selector: 'krih-account-container',
  imports: [StandardModuleHeader, SpinnerDirective, SkyTable],
  templateUrl: './account-container.html',
  styleUrl: './account-container.css',
})
export class AccountContainer implements OnInit {
  private readonly store = inject(AccountsStore);

  protected columnsConfig: SkyColumnsConfig[] = [
    { field: 'bank', header: 'shared.text.name', type: 'text', grow: 2 },
    { field: 'status', header: 'shared.text.status.title', type: 'activePill', grow: 1 },
    {
      field: 'account_type',
      header: 'shared.text.type',
      type: 'mapNumber',
      grow: 0.5,
      mapValues: ACCOUNT_TYPE_MAP,
    },
    {
      field: 'currency',
      header: 'account.fields.currency.header',
      type: 'mapNumber',
      cssClass: 'text-center',
      grow: 0.5,
      mapValues: ACCOUNT_CURRENCY_SYMBOL_MAP,
    },
    { field: 'balance', header: 'account.fields.balance.label', type: 'text', grow: 1.5 },
    { field: 'account_location', header: 'account.fields.location.label', type: 'text' },
  ];

  protected actionTable: SkyTableActionsType[] = ['update', 'delete'];
  readonly dataTable = this.store.dataTableSource;
  readonly getAccounts = this.store.getAccounts;
  readonly loading = this.store.listLoading;

  ngOnInit(): void {
    this.getAccounts();
  }
}
