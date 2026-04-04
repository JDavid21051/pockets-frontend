import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { MenuItemModel } from '@/domain/models/ui/menu-item.model';
import { TranslatePipe } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { cn } from '@/infra/parsers/css-class-name';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'krih-menu-item',
  imports: [MatIconModule, TranslatePipe, RouterLink, RouterLinkActive],
  styleUrl: './menu-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <button
      [routerLink]="dataItem().routerLink"
      routerLinkActive="border-1 bg-secondary-900/10 border-neutral-300"
      [class]="
        cn(
          dataItem().linkClass,
          minView() ? 'justify-center' : 'justify-start px-3',
          'flex items-center gap-2 min-h-10 w-full rounded-md hover:bg-secondary-900/20 cursor-pointer'
        )
      "
      [style]="dataItem().styleClass"
    >
      @if (dataItem().iconStart) {
        <mat-icon [svgIcon]="dataItem().iconStart!" />
      }
      @if (!minView()) {
        <span class="text-base truncate">{{ dataItem().label | translate }}</span>
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
