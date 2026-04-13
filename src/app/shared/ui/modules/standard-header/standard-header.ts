import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'krih-standard-header',
  imports: [MatIcon, TranslatePipe, MatButtonModule],
  styleUrl: './standard-header.css',
  template: `
    <header class="px-5 border border-neutral-500 flex justify-between rounded-lg py-4">
      <span class="flex items-center gap-2">
        @if (icon()) {
          <mat-icon class="size-7!" [svgIcon]="icon()!" />
        }
        <h3>{{ headerTitle() | translate }}</h3>
      </span>
      <div class="flex items-center gap-2">
        <button
          type="button"
          (click)="clickPrimaryAction.emit()"
          matButton="elevated"
          class="max-h-8 uppercase border!"
        >
          <span class="font-medium! text-sm!">{{ textPrimaryAction() | translate }}</span>
        </button>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardModuleHeader {
  readonly headerTitle = input.required<string>();
  readonly icon = input<string>();
  readonly textPrimaryAction = input<string>('');
  readonly clickPrimaryAction = output();
}
