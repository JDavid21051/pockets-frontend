/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/5/2026
 * Module name:  initial-headlines-state.const.ts
 * File name:    initial-headlines-state.const
 * IDE:          WebStorm
 */

import type {
  HeadlinesModelList,
  HeadlinesStateModel,
} from '@/domain/models/headlines/headlines.model';
import { MatTableDataSource } from '@angular/material/table';

export const initHeadlinesState: HeadlinesStateModel = {
  listLoading: false,
  dataList: [],
  dataTableSource: new MatTableDataSource<HeadlinesModelList>([]),
};
