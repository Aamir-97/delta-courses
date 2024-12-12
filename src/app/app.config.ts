import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
// import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
// import { BarController, Colors, Legend } from 'chart.js';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([]),
      withInterceptorsFromDi()
    ),
    // provideCharts(withDefaultRegisterables()),
    // provideCharts({ registerables: [BarController, Legend, Colors] }),
  ],
};
