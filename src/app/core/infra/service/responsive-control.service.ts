import { ViewportRuler } from '@angular/cdk/scrolling';
import { inject, Injectable, NgZone, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { MOBILE_BREAKPOINT, THROTTLE_TIME_MS } from '@/infra/const/app-utils.const';
import { NATIVE_WINDOW } from '@/infra/itoken/native-windows.itokens';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveControlService {
  private readonly viewportRuler: ViewportRuler = inject(ViewportRuler);
  private readonly ngZone: NgZone = inject(NgZone);
  private readonly nativeWindow = inject(NATIVE_WINDOW);
  private readonly changeResponsiveView = new Subject<boolean>();
  readonly isResponsive = signal(true);

  constructor() {
    this.validateResponsiveView();
    this.viewportRuler.change(THROTTLE_TIME_MS).subscribe({
      next: () => {
        this.ngZone.run(() => {
          this.validateResponsiveView();
        });
      },
    });
  }

  private validateResponsiveView(): void {
    const isResponsiveView = this.isResponsive();
    const currentWidth = this.nativeWindow.innerWidth;
    this.isResponsive.set(currentWidth < MOBILE_BREAKPOINT);
    if (isResponsiveView !== this.isResponsive() && this.isResponsive()) {
      this.changeResponsiveView.next(true);
    } else if (isResponsiveView !== this.isResponsive() && !this.isResponsive()) {
      this.changeResponsiveView.next(false);
    }
  }

  onChangeResponsive() {
    return this.changeResponsiveView.asObservable();
  }
}
