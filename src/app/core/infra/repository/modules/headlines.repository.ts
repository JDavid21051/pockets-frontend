/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/4/2026
 * Module name:  headlines.repository.ts
 * File name:    headlines.repository
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import type { HeadlinesPort } from '@/application/ports/repository/headlines/headlines.port';
import { URL_SERVICES } from '@/infra/config/urls-services.config';
import { CoreHttpClientService } from '@/infra/http/core-http-client.service';
import type { HeadlinesModelList } from '@/domain/models/headlines/headlines.model';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HeadlinesRepository implements HeadlinesPort {
  private readonly urls = URL_SERVICES.headlines;
  private readonly http = inject(CoreHttpClientService);

  list() {
    return this.http.get<HeadlinesModelList[]>(this.urls.base + this.urls.list);
  }

  create() {
    return of<HeadlinesModelList>({} as HeadlinesModelList);
  }

  update() {
    return of<HeadlinesModelList>({} as HeadlinesModelList);
  }
}
