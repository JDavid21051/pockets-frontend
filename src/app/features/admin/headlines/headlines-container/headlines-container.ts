import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SkyTable } from '@/shared/ui/organisms/sky-table/sky-table';
import type { SkyColumnsConfig } from '@/domain/models/uix/sky-table.model';
import { HeadlinesStore } from '@/infra/store/headlines.store';
import { StandardModuleHeader } from '@/shared/ui/modules/standard-header/standard-header';
import type { RxMethod } from '@ngrx/signals/rxjs-interop';

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
    { field: 'headlines_name', header: 'Nombre', type: 'text' },
    { field: 'document_type', header: 'Tipo', type: 'text' },
    { field: 'headlines_document', header: 'Documento', type: 'text' },
  ];

  readonly dataTable = this.store.dataTableSource;
  readonly getHeadlines: RxMethod<void> = this.store.getHeadlines;

  ngOnInit() {
    this.getHeadlines();
  }
}
