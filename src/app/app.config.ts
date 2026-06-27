import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';
import { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AUTH_STORAGE_KEY } from '@/infra/itoken/auth-storage-key.itoken';
import { KRIH_MODULES_CONFIG_TOKEN } from '@/infra/itoken/modules-config.itoken';
import { authInterceptor } from '@/infra/interceptor/auth.interceptor';
import { environment } from '@/environments/environment';
import { THEME_CONFIG_STORAGE } from '@/infra/itoken/theme-config-storage-key.itoken';
import { AllowedThemeEnum } from '@/domain/enums/allowed-theme.enum';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideTranslateService({
      lang: AllowedLanguagesEnum.es,
      fallbackLang: AllowedLanguagesEnum.en,
      loader: provideTranslateHttpLoader({
        prefix: './i18n/',
        suffix: '.json',
      }),
    }),
    {
      provide: LOCALE_ID,
      useValue: 'es-CO',
    },
    {
      provide: KRIH_MODULES_CONFIG_TOKEN,
      useValue: {
        baseEndpoint: environment.apiUrl,
        tokenKeyword: 'JWT',
      },
    },
    {
      provide: AUTH_STORAGE_KEY,
      useValue: 'auth_app_data',
    },
    {
      provide: THEME_CONFIG_STORAGE,
      useValue: {
        storage: 'theme_app_data',
        default: AllowedThemeEnum.lightBase,
        darkFallback: AllowedThemeEnum.darkViolet,
      },
    },
  ],
};
