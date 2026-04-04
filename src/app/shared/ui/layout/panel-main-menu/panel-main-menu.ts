import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import type { MenuItemModel } from '@/domain/models/ui/menu-item.model';
import { MenuItem } from '@/shared/ui/layout/menu-item/menu-item';

@Component({
  selector: 'krih-panel-main-menu',
  imports: [MenuItem],
  styleUrl: './panel-main-menu.css',
  template: `
    <div class="flex flex-col gap-1 px-3 py-2">
      @for (item of menuItems(); track item.id) {
        <krih-menu-item [dataItem]="item" [minView]="minView()" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PanelMainMenu {
  readonly menuItems = input.required<MenuItemModel[]>();
  readonly minView = input(false);
}
