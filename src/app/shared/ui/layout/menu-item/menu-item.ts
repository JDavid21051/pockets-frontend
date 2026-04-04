import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { MenuItemModel } from '@/domain/models/ui/menu-item.model';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { cn } from '@/infra/parsers/css-class-name';

@Component({
  selector: 'krih-menu-item',
  imports: [MatIconModule, TranslatePipe],
  styleUrl: './menu-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      [class.justify-start]="!minView()"
      [class.justify-center]="minView()"
      [class]="
        cn(
          dataItem().linkClass,
          'flex justify-start items-center gap-2 min-h-10 w-full rounded-md hover:bg-neutral-800 cursor-pointer'
        )
      "
      [style]="dataItem().styleClass"
    >
      @if (dataItem().iconStart) {
        <mat-icon [svgIcon]="dataItem().iconStart!" />
      }
      @if (!minView()) {
        <span>{{ dataItem().label | translate }}</span>
      }
      @if (dataItem().iconEnd) {
        <mat-icon [svgIcon]="dataItem().iconEnd!" />
      }
    </button>
  `,
  host: {
    class: '',
  },
})
export class MenuItem {
  protected readonly cn = cn;
  readonly dataItem = input.required<MenuItemModel>();
  readonly minView = input(false);
}
