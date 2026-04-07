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

export interface CreateHeadlinesDto {
  headlines_name: string;
  headlines_document: string;
  document_type: string;
}

export interface UpdateHeadlinesDto extends CreateHeadlinesDto {
  id: string;
}

export interface HeadlinesStateModel {
  listLoading: boolean;
  dataList: HeadlinesModelList[];
}
