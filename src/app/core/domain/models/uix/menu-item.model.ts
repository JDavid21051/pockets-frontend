/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/2/2026
 * Module name:  menu-item.model.ts
 * File name:    menu-item.model
 * IDE:          WebStorm
 */

import type { QueryParamsHandling } from '@angular/router';
import type { TooltipOptionsModel } from '@/domain/models/uix/app-tooltip-options.model';
import type { DangerousAny } from '@/domain/types/types';

/**
 * MenuItem provides the following properties. Note that not all of them may be utilized by the tabmenu component.
 * @group Interface
 */
export interface MenuItemModel {
  /**
   * Text of the item.
   */
  label?: string;
  /**
   * Icon of the item.
   */
  iconStart?: string;
  /**
   * Icon of the item.
   */
  iconEnd?: string;
  /**
   * External link to navigate when item is clicked.
   */
  url?: string;
  /**
   * An array of children menuitems.
   */
  items?: MenuItemModel[];
  /**
   * Visibility of submenu.
   */
  expanded?: boolean;
  /**
   * When set as true, disables the menuitem.
   */
  disabled?: boolean;
  /**
   * Whether the dom element of menuitem is created or not.
   */
  visible?: boolean;
  /**
   * Specifies where to open the linked document.
   */
  target?: string;
  /**
   * Whether to escape the label or not. Set to false to display html content.
   */
  escape?: boolean;
  /**
   * Configuration for active router link.
   */
  routerLinkActiveOptions?: DangerousAny;
  /**
   * Defines the item as a separator.
   */
  separator?: boolean;
  /**
   * Value of the badge.
   */
  badge?: string;
  /**
   * Tooltip of the item.
   */
  tooltip?: string;
  /**
   * Position of the tooltip item.
   */
  tooltipPosition?: string;
  /**
   * Style class of the badge.
   */
  badgeStyleClass?: string;
  /**
   * Inline style of the menuitem.
   */
  style?: Record<string, DangerousAny> | null | undefined;
  /**
   * Style class of the menuitem.
   */
  styleClass?: string;
  /**
   * Tooltip text of the item.
   */
  title?: string;
  /**
   * Identifier of the element.
   */
  id?: string;
  /**
   * Value of HTML data-* attribute.
   */
  automationId?: DangerousAny;
  /**
   * Specifies tab order of the item.
   */
  tabindex?: string;
  /**
   * RouterLink definition for internal navigation.
   */
  routerLink?: DangerousAny;
  /**
   * Query parameters for internal navigation via routerLink.
   */
  queryParams?: Record<string, DangerousAny>;
  /**
   * Sets the hash fragment for the URL.
   */
  fragment?: string;
  /**
   *  How to handle query parameters in the router link for the next navigation. One of:
   merge : Merge new with current parameters.
   preserve : Preserve current parameters.k.
   */
  queryParamsHandling?: QueryParamsHandling;
  /**
   * When true, preserves the URL fragment for the next navigation.
   */
  preserveFragment?: boolean;
  /**
   * When true, navigates without pushing a new state into history.
   */
  skipLocationChange?: boolean;
  /**
   * When true, navigates while replacing the current state in history.
   */
  replaceUrl?: boolean;
  /**
   * Inline style of the item's icon.
   */
  iconStyle?: Record<string, DangerousAny> | null | undefined;
  /**
   * Class of the item's icon.
   */
  iconClass?: string;
  /**
   * Inline style of the item's label.
   */
  labelStyle?: Record<string, DangerousAny> | null | undefined;
  /**
   * Class of the item's label.
   */
  labelClass?: string;
  /**
   * Inline style of the item's link.
   */
  linkStyle?: Record<string, DangerousAny> | null | undefined;
  /**
   * Class of the item's link.
   */
  linkClass?: string;
  /**
   * Developer-defined state that can be passed to DangerousAny navigation.
   * @see {TooltipOptionsModel}
   */
  state?: Record<string, DangerousAny>;
  /**
   * Options of the item's tooltip.
   * @see {TooltipOptionsModel}
   */
  tooltipOptions?: TooltipOptionsModel;

  /**
   * Callback to execute when item is clicked.
   */
  command?(event: MenuItemCommandEvent): void;

  /**
   * Optional
   */
  // eslint-disable-next-line @typescript-eslint/member-ordering
  [key: `_${string}`]: DangerousAny;
}

/**
 * Custom command event
 * @see {@link MenuItemModel.command}
 * @group Events
 */
export interface MenuItemCommandEvent {
  /**
   * Browser event.
   */
  originalEvent?: Event;
  /**
   * Selected menu item.
   */
  item?: MenuItemModel;
  /**
   * Index of the selected item.
   */
  index?: number;
}
