import type { Signal } from '@angular/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'krih-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pockets-frontend');
  protected pageSizeOptions: Signal<number[]> = signal([5, 10, 25]);

  private addPageSizes(): void {
    this.pageSizeOptions().push(50);
    this.pageSizeOptions().push(100);
    this.pageSizeOptions().push(200);
  }
}
