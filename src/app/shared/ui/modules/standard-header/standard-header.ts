import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'krih-standard-header',
  imports: [MatIcon, TranslatePipe],
  styleUrl: './standard-header.css',
  template: `
    <header class="px-5 border border-neutral-500 flex justify-between rounded-lg py-4">
      <span class="flex items-center gap-2">
        @if (icon()) {
          <mat-icon class="size-7!" [svgIcon]="icon()!" />
        }
        <h3>{{ headerTitle() | translate }}</h3>
      </span>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardModuleHeader {
  readonly headerTitle = input.required<string>();
  readonly icon = input<string>();
}
