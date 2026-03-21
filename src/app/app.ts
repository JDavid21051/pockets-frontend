import { Component, Signal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDrawerContainer, MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatCheckbox, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('pockets-frontend');
  protected pageSizeOptions: Signal<number[]> = signal([5, 10, 25]);

  constructor() {}

  private addPageSizes(): void {
    this.pageSizeOptions().push(50);
    this.pageSizeOptions().push(100);
    this.pageSizeOptions().push(200);
  }
}
