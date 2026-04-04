import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewChild,
} from '@angular/core';
import type { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { type Sort, MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import type { SkyColumnsConfig, TableActionsConfig } from '@/domain/models/uix/sky-table.model';

@Component({
  selector: 'krih-sky-table',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormField,
    MatInput,
    MatLabel,
    TranslatePipe,
  ],
  templateUrl: './sky-table.html',
  styleUrl: './sky-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyTable<T> implements AfterViewInit {
  readonly showSimpleFilter = input(false);
  readonly actionIcon = input('more_vert');
  readonly columnsConfig = input.required<SkyColumnsConfig[]>();
  readonly dataSource = input.required<MatTableDataSource<T>>();
  readonly actionsConfig = input<TableActionsConfig[]>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly columnsField = computed(() => this.columnsConfig().map((col) => col.field));

  constructor() {
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    // Assign the data to the data source for the table to render
  }

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource().filter = filterValue.trim().toLowerCase();

    if (this.dataSource().paginator) {
      this.dataSource().paginator?.firstPage();
    }
  }

  onSortTable(data: Sort) {
    console.log({ data });
  }
}
