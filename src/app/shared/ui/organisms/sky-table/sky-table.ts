import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import type { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { type Sort, MatSort, MatSortModule } from '@angular/material/sort';
import type { PageEvent } from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import type { SkyColumnsConfig, TableActionsConfig } from '@/domain/models/uix/sky-table.model';
import { DESKTOP_MAX_ROWS } from '@/infra/const/app-utils.const';
import { MatIcon } from '@angular/material/icon';

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
    MatIcon,
  ],
  templateUrl: './sky-table.html',
  styleUrl: './sky-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyTable<T> implements AfterViewInit {
  protected readonly DESKTOP_MAX_ROWS = DESKTOP_MAX_ROWS;
  readonly showSimpleFilter = input(false);
  readonly actionIcon = input('more_vert');
  readonly actionsConfig = input<TableActionsConfig[]>([]);
  readonly columnsConfig = input.required<SkyColumnsConfig[]>();
  readonly dataSource = input.required<MatTableDataSource<T>>();
  readonly clickAction = output();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly columnsField = computed(() => {
    const actionHeader = ['id'];
    console.log({ aa: this.columnsConfig() });
    console.log({ vvv: actionHeader });
    return this.columnsConfig()
      .map((col) => col.field)
      .concat(actionHeader);
  });

  readonly pageIndex = signal(0);

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

  onClickActionItem(item: boolean): void {
    console.log({ item });
    this.clickAction.emit();
  }

  onChangePaginatorPage(e: PageEvent) {
    this.pageIndex.set(e.pageIndex);
  }
}
