/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/1/2026
 * Module name:  spinner.directive.ts
 * File name:    spinner.directive
 * IDE:          WebStorm
 */

import type { ComponentRef } from '@angular/core';
import { ElementRef, inject, Injector, Renderer2, ViewContainerRef } from '@angular/core';
import { Directive, HostBinding, input } from '@angular/core';
import type { StandardSizeType } from '@/domain/types/app/standard-size.type';
import type { StandardStatusType } from '@/domain/types/app/standard-status.type';
import { LoadingComponent } from '@/shared/ui/atoms/loading/loading';
import type { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';

@Directive({
  selector: '[krihSpinner]',
  standalone: true,
  host: {
    '[attr.data-testid]': '"spinner-container"',
  },
})
export class SpinnerDirective {
  private readonly directiveView = inject(ViewContainerRef);
  private readonly renderer = inject(Renderer2);
  private readonly injector = inject(Injector);
  private readonly directiveElement = inject(ElementRef);
  spinner: ComponentRef<LoadingComponent> | null = null;
  /**
   * Spinner message shown next to the icon
   */
  spinnerMessage = input('');
  /**
   * Spinner status color
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  spinnerStatus = input<StandardStatusType>('basic');
  /**
   * Spinner size. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  spinnerSize = input<StandardSizeType>('md');

  /**
   * Directive value - show or hide spinner
   * @param {boolean} value
   */
  krihSpinner = input(false, {
    transform: (value: boolean) => (value ? this.show() : this.hide()),
  });

  @HostBinding('class.zb-spinner-container')
  isSpinnerExist = false;

  hide(): boolean | undefined {
    console.log(this.isSpinnerExist, 'isSpinnerExist hidden');
    if (this.isSpinnerExist) {
      this.directiveView.remove();
      this.isSpinnerExist = false;
    }
    return false;
  }

  show(): boolean | undefined {
    console.log(this.isSpinnerExist, 'show isSpinnerExist');
    if (!this.isSpinnerExist) {
      console.log(this.spinner, 'show spinner');
      this.spinner = this.directiveView.createComponent(LoadingComponent, {
        injector: this.injector,
      });
      this.setInstanceInputs(this.spinner.instance);
      console.log(this.spinner, 'show spinner after');
      this.renderer.appendChild(
        this.directiveElement.nativeElement,
        this.spinner.location.nativeElement,
      );
      this.spinner.changeDetectorRef.detectChanges();
      this.isSpinnerExist = true;
    }
    return true;
  }

  setInstanceInputs(instance: LoadingComponent): void {
    instance.message.set(this.spinnerMessage());
    if (typeof this.spinnerStatus !== 'undefined')
      instance.status.set(this.spinnerStatus() as AppStatusCoreEnum);
    if (typeof this.spinnerSize !== 'undefined') instance.size.set(this.spinnerSize());
  }
}
