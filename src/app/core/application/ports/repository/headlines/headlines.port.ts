/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/4/2026
 * Module name:  headlines.port.ts
 * File name:    headlines.port
 * IDE:          WebStorm
 */

import type { Observable } from 'rxjs';
import type {
  CreateHeadlinesDto,
  HeadlinesModelList,
  UpdateHeadlinesDto,
} from '@/domain/models/headlines/headlines.model';
import type { UUID } from '@/domain/types/types';

export interface HeadlinesPort {
  readonly list: () => Observable<HeadlinesModelList[]>;
  readonly create: (param: CreateHeadlinesDto) => Observable<HeadlinesModelList>;
  readonly update: (param: UpdateHeadlinesDto) => Observable<HeadlinesModelList>;
  readonly remove: (headlineId: UUID) => Observable<boolean>;
}
