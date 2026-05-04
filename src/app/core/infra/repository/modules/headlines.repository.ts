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
import type {
  CreateHeadlinesDto,
  HeadlinesModelList,
  UpdateHeadlinesDto,
} from '@/domain/models/headlines/headlines.model';
import type { UUID } from '@/domain/types/types';

@Injectable({ providedIn: 'root' })
export class HeadlinesRepository implements HeadlinesPort {
  private readonly urls = URL_SERVICES.headlines;
  private readonly http = inject(CoreHttpClientService);

  list() {
    return this.http.get<HeadlinesModelList[]>(this.urls.base + this.urls.list);
  }

  create(params: CreateHeadlinesDto) {
    return this.http.post<HeadlinesModelList>(this.urls.base + this.urls.create, params);
  }

  update(params: UpdateHeadlinesDto) {
    return this.http.patch<HeadlinesModelList>({
      endpoint: this.urls.base + this.urls.update,
      body: params,
      urlParams: params.id,
    });
  }

  remove(headlineId: UUID) {
    return this.http.delete<boolean>({
      endpoint: this.urls.base + this.urls.delete,
      urlParams: headlineId,
      body: {},
    });
  }
}
