import { Component, HostBinding, model } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AppStatusCoreEnum } from '@/domain/enums/app/app-status-core.enum';

@Component({
  selector: 'krih-loading',
  imports: [MatProgressSpinner],
  styleUrl: './loading.css',
  template: `
    <mat-spinner />
    @if (message()) {
      <span class="spinner_msm">{{ message() }}</span>
    }
  `,
  host: {
    class: 'class',
  },
})
export class LoadingComponent {
  /**
   * Loading text that is shown near the icon
   */
  readonly message = model('');

  /**
   * Spinner size, available sizes:
   * tiny, small, medium, large, giant
   * @param {string} value
   */
  readonly size = model('md');

  /**
   * Spinner status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  readonly status = model<AppStatusCoreEnum>(AppStatusCoreEnum.basic);

  @HostBinding('class.size-xs')
  get tiny(): boolean {
    return this.size() === 'xs';
  }

  @HostBinding('class.size-sm')
  get small(): boolean {
    return this.size() === 'sm';
  }

  @HostBinding('class.size-md')
  get medium(): boolean {
    return this.size() === 'md';
  }

  @HostBinding('class.size-lg')
  get large(): boolean {
    return this.size() === 'lg';
  }

  @HostBinding('class.size-xl')
  get giant(): boolean {
    return this.size() === 'xl';
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status() === 'primary';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status() === 'info';
  }

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status() === 'success';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status() === 'warning';
  }

  @HostBinding('class.status-alert')
  get alert(): boolean {
    return this.status() === 'alert';
  }

  @HostBinding('class.status-error')
  get error(): boolean {
    return this.status() === 'error';
  }

  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.status() === 'basic';
  }

  @HostBinding('class.status-extra')
  get extra(): boolean {
    return this.status() === 'extra';
  }

  @HostBinding('class.status-secondary')
  get secondary(): boolean {
    return this.status() === 'secondary';
  }

  @HostBinding('class.status-ternary')
  get ternary(): boolean {
    return this.status() === 'ternary';
  }
}
