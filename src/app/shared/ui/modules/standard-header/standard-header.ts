import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'krih-standard-header',
  imports: [MatIcon],
  styleUrl: './standard-header.css',
  template: `
    <header class="px-5 border border-neutral-500 flex justify-between rounded-lg py-4">
      <span class="flex items-center gap-2">
        @if (icon()) {
          <mat-icon class="size-7!" [svgIcon]="icon()!" />
        }
        <h3>{{ headerTitle() }}</h3>
      </span>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardModuleHeader {
  readonly headerTitle = input.required<string>();
  readonly icon = input<string>();
}
