import { Component, computed, model } from '@angular/core';
import { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';
import type { StandardSizeType } from '@/domain/types/app/standard-size.type';
import { MatIcon } from '@angular/material/icon';
import { SPINNER_CONST } from '@/infra/const/ui/spiner.const';

@Component({
  selector: 'krih-loading',
  imports: [MatIcon],
  template: `
    <mat-icon [svgIcon]="icon()" [class]="statusClass()" />
    @if (message()) {
      <span class="spinner_msm">{{ message() }}</span>
    }
  `,
  host: {
    class: 'class [&>mat-icon]:animate-spin _',
    '[class._&>mat-icon.size-xs]': 'size() === "xs"',
    '[class._&>mat-icon.size-sm]': 'size() === "sm"',
    '[class._&>mat-icon.size-md]': 'size() === "md"',
    '[class._&>mat-icon.size-lg]': 'size() === "lg"',
    '[class._&>mat-icon.size-xl]': 'size() === "xl"',
  },
})
export class LoadingComponent {
  /**
   * Loading text that is shown near the icon
   */
  readonly message = model('');
  readonly icon = model('progress_activity');

  /**
   * Spinner size, available sizes:
   * tiny, small, medium, large, giant
   * @param {string} value
   */
  readonly size = model<StandardSizeType>('md');

  /**
   * Spinner status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  readonly status = model<AppStatusCoreEnum>(AppStatusCoreEnum.basic);
  readonly statusClass = computed<string>(() => SPINNER_CONST[this.status()]);
}
