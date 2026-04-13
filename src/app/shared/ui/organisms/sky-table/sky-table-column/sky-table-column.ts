import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type {
  SkyColumnsConfig,
  SkyIconColumnsConfig,
  SkyMapNumberColumnsConfig,
} from '@/domain/models/uix/sky-table.model';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'krih-sky-table-column',
  imports: [TranslatePipe, MatIcon, MatTooltip],
  template: `
    @if (isTextCol()) {
      <span class="truncate block">
        {{ cellContentText() }}
      </span>
    } @else if (isPillCol()) {
      <span>N/A</span>
    } @else if (isIconCol()) {
      <mat-icon
        [svgIcon]="iconConfig().icon"
        [class]="iconConfig().iconClass"
        [matTooltip]="iconConfig().tooltip"
        [matTooltipPosition]="iconConfig().tooltipPosition"
      />
    } @else if (isMapNumberCol()) {
      <span class="truncate block">
        {{ cellContentMapNumber() | translate }}
      </span>
    } @else {
      <span>N/A</span>
    }
  `,
  host: {
    class: 'table-cell',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkyTableColumn {
  readonly colConfig = input.required<SkyColumnsConfig>();
  readonly rowData = input.required<Record<string, unknown>>();
  readonly className = input<string>('');

  readonly cellContentText = computed(() => {
    const rowData = this.rowData();

    return rowData[this.colConfig().field];
  });

  readonly isTextCol = computed(() => this.colConfig().type === 'text');
  readonly isPillCol = computed(() => this.colConfig().type === 'pill');
  readonly isIconCol = computed(() => this.colConfig().type === 'icon');
  readonly iconConfig = computed<SkyIconColumnsConfig>(
    () => this.colConfig() as SkyIconColumnsConfig,
  );

  readonly isMapNumberCol = computed(() => this.colConfig().type === 'mapNumber');
  readonly mapNumberConfig = computed<SkyMapNumberColumnsConfig>(
    () => this.colConfig() as SkyMapNumberColumnsConfig,
  );

  readonly cellContentMapNumber = computed(() => {
    const mapValues = this.mapNumberConfig().mapValues;

    const value = this.cellContentText() as number;

    return mapValues[value];
  });
}
