import type { OnInit } from '@angular/core';
import { model, signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SkyTable } from '@/shared/ui/organisms/sky-table/sky-table';
import type { SkyColumnsConfig } from '@/domain/models/uix/sky-table.model';
import { HeadlinesStore } from '@/application/store/headlines.store';
import { StandardModuleHeader } from '@/shared/ui/modules/standard-header/standard-header';
import type { RxMethod } from '@ngrx/signals/rxjs-interop';
import type { SkyTableActionsType } from '@/domain/types/uix/table.type';
import { DOCUMENT_TYPE_MAP } from '@/infra/const/headlines/headlines-map.const';
import { MatDialog } from '@angular/material/dialog';
import { HeadlinesFormContainer } from '@/features/admin/headlines/headlines-form-container/headlines-form-container';
import { SpinnerDirective } from '@/infra/directives/spinner.directive';

@Component({
  selector: 'krih-headlines-container',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    StandardModuleHeader,
    SpinnerDirective,
    SkyTable,
  ],
  templateUrl: './headlines-container.html',
})
export class HeadlinesContainer implements OnInit {
  private readonly store = inject(HeadlinesStore);
  protected columnsConfig: SkyColumnsConfig[] = [
    { field: 'headlines_name', header: 'shared.text.name', type: 'text', grow: 2 },
    {
      field: 'document_type',
      header: 'shared.text.type',
      type: 'mapNumber',
      grow: 0.5,
      mapValues: DOCUMENT_TYPE_MAP,
    },
    { field: 'headlines_document', header: 'headline.fields.document.label', type: 'text' },
  ];

  protected actionTable: SkyTableActionsType[] = ['update'];

  readonly dataTable = this.store.dataTableSource;
  readonly getHeadlines: RxMethod<void> = this.store.getHeadlines;
  readonly loading = this.store.listLoading;

  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.getHeadlines();
  }

  clickOpenCreateForm(): void {
    const dialogRef = this.dialog.open(HeadlinesFormContainer, {
      data: { name: this.name(), animal: this.animal() },
      position: {
        right: '0px',
        top: '0px',
      },
      height: '100svh',
      width: '380px',
      panelClass: 'mode__sidebar',
      hasBackdrop: true,
      closeOnNavigation: true,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }
}
