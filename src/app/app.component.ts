import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'delta-courses';
  private hostedDomain: string;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.hostedDomain = window.location.origin;
      setEnvironment(this.hostedDomain);
    }
  }
}

export const Environment = {
  production: false,
  apiBaseUrl: 'http://localhost',
};

export function setEnvironment(hostedDomain: string) {
  if (hostedDomain.includes('localhost')) {
    Environment.apiBaseUrl = 'http://localhost/api/';
  } else {
    Environment.apiBaseUrl = hostedDomain + '/api/';
  }
}
