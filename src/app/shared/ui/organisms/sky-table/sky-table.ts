import { ElementRef } from '@angular/core';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChild,
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
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import type { SkyTableActionsType } from '@/domain/types/uix/table.type';
import { TABLE_ACTIONS_FULL_CONFIG_MAP } from '@/infra/const/ui/table-actions.const';
import { cn } from '@/infra/parsers/css-class-name';
import { isNullish } from '@/infra/const/is-nullish.const';
import { SkyTableColumn } from '@/shared/ui/organisms/sky-table/sky-table-column/sky-table-column';

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
    MatButtonModule,
    MatMenuModule,
    SkyTableColumn,
  ],
  templateUrl: './sky-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyTable<T> implements AfterViewInit {
  protected readonly DESKTOP_MAX_ROWS = DESKTOP_MAX_ROWS;
  protected readonly cn = cn;

  readonly columnsConfig = input.required<SkyColumnsConfig[]>();
  readonly dataSource = input.required<MatTableDataSource<T>>();
  readonly showSimpleFilter = input(false);
  readonly actionIcon = input('more_vert');
  readonly actionColWidth = input(60);
  readonly actionsConfig = input<SkyTableActionsType[]>([]);
  readonly clickAction = output();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  readonly matTableRef = viewChild('tableRefMat', { read: ElementRef });

  readonly tableHeaderWidth = computed<null | number>(() => {
    const tableRef = this.matTableRef();

    if (!tableRef) return null;

    return tableRef.nativeElement.clientWidth;
  });

  readonly actionColPercent = computed<number>(() => {
    const tableHeaderWidth = this.tableHeaderWidth();
    if (isNullish(tableHeaderWidth)) return 0;

    const widthPercent = this.actionColWidth() / tableHeaderWidth;

    return widthPercent * 100;
  });

  readonly columnsField = computed<string[]>(() => {
    const actionHeader = ['id'];
    return this.columnsConfig()
      .map((col) => col.field)
      .concat(this.actionsConfig().length > 0 ? actionHeader : []);
  });

  readonly columnPerPercent = computed(() => {
    console.log({ actionColPercent: this.actionColPercent() });

    const availableWidth = 100 - this.actionColPercent();

    console.log({ availableWidth });

    return availableWidth / this.columnsField().length;
  });

  readonly actionFullConfig = computed<TableActionsConfig[]>(() =>
    this.actionsConfig().map(
      (valueAction): TableActionsConfig => TABLE_ACTIONS_FULL_CONFIG_MAP[valueAction],
    ),
  );

  readonly pageIndex = signal(0);

  readonly getActionColumnWidth = computed(
    () => `w-[${this.actionColWidth()}px] max-w-[${this.actionColWidth()}px]`,
  );

  getColumnWidth = (grow?: number): string => {
    const growthFactor = grow ?? 1;
    const colWidth = (this.columnPerPercent() * growthFactor).toFixed(1);

    return `w-[${colWidth}%] max-w-[${colWidth}%]`;
  };

  ngAfterViewInit() {
    this.dataSource().paginator = this.paginator;
    this.dataSource().sort = this.sort;
    console.log(this.matTableRef());
    console.log(this.matTableRef()?.nativeElement);
    console.log(this.matTableRef()?.nativeElement.clientWidth);
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
