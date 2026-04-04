/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/4/2026
 * Module name:  headlines.model.ts
 * File name:    headlines.model
 * IDE:          WebStorm
 */

import type { UUID } from '@/domain/types/types';

export interface HeadlinesModelList {
  id: UUID;
  headlines_name: string;
  status: boolean;
  document_type: number;
  headlines_document: string;
  created_at: string;
}
