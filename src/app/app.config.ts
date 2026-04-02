import type { ApplicationConfig } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideTranslateService } from '@ngx-translate/core';
import { AllowedLanguagesEnum } from '@/domain/enums/allowed-languages.enum';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AUTH_STORAGE_KEY } from '@/infra/itoken/auth-storage-key.itoken';
import { KRIH_MODULES_CONFIG_TOKEN } from '@/infra/itoken/modules-config.itoken';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
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
        baseEndpoint: 'https://invoices-api-theta.vercel.app/api/',
        tokenKeyword: 'jwt',
      },
    },
    {
      provide: AUTH_STORAGE_KEY,
      useValue: 'auth_app_data',
    },
  ],
};
