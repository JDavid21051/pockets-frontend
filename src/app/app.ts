import { Component } from '@angular/core';
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
export class App {}
