import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconRegisterService } from '@/infra/service/icon-register.service';
@Component({
  selector: 'krih-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly iconRegistry = inject(IconRegisterService);
  constructor() {
    this.iconRegistry.register();
  }
}
