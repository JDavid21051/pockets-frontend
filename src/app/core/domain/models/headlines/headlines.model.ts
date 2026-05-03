/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/4/2026
 * Module name:  headlines.model.ts
 * File name:    headlines.model
 * IDE:          WebStorm
 */

import type { UUID } from '@/domain/types/types';
import type { MatTableDataSource } from '@angular/material/table';
import type { MatDialogRef } from '@angular/material/dialog';
import type { HeadlinesFormContainer } from '@/features/admin/headlines/headlines-form-container/headlines-form-container';

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
  document_type: number;
}

export interface UpdateHeadlinesDto extends CreateHeadlinesDto {
  id: UUID;
}

export interface HeadlinesStateModel {
  listLoading: boolean;
  headlineSelected: HeadlinesModelList[];
  dialogRef: MatDialogRef<HeadlinesFormContainer, boolean> | null;
  dataList: HeadlinesModelList[];
  dataTableSource: MatTableDataSource<HeadlinesModelList>;
}
