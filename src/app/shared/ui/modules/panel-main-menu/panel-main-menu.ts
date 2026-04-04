import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@/shared/ui/atoms/menu-item/menu-item';
import type { MenuItemModel } from '@/domain/models/uix/menu-item.model';

@Component({
  selector: 'krih-panel-main-menu',
  imports: [MenuItem],
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
