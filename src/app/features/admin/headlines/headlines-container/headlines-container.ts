import type { OnInit } from '@angular/core';
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

@Component({
  selector: 'krih-headlines-container',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SkyTable,
    StandardModuleHeader,
  ],
  templateUrl: './headlines-container.html',
  styleUrl: './headlines-container.css',
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
    { field: 'headlines_document', header: 'headline.fields.document', type: 'text' },
  ];

  protected actionTable: SkyTableActionsType[] = ['update'];

  readonly dataTable = this.store.dataTableSource;
  readonly getHeadlines: RxMethod<void> = this.store.getHeadlines;

  ngOnInit() {
    this.getHeadlines();
  }
}
