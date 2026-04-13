/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         4/12/2026
 * Module name:  headlines-map.const.ts
 * File name:    headlines-map.const
 * IDE:          WebStorm
 */

import { DocumentTypeEnum } from '@/domain/enums/headlines/document-type.enum';
import type { SummaryListModel } from '@/domain/models/app/summary-list.model';

export const DOCUMENT_TYPE_MAP: Record<number, string> = {
  [DocumentTypeEnum.CC]: 'shared.maps.cc',
  [DocumentTypeEnum.CE]: 'shared.maps.ce',
  [DocumentTypeEnum.TI]: 'shared.maps.ti',
  [DocumentTypeEnum.PT]: 'shared.maps.pt',
};

export const DOCUMENT_TYPE_LIST: SummaryListModel<DocumentTypeEnum>[] = [
  {
    name: 'shared.maps.cc',
    id: DocumentTypeEnum.CC,
  },
  {
    name: 'shared.maps.ce',
    id: DocumentTypeEnum.CE,
  },
  {
    name: 'shared.maps.ti',
    id: DocumentTypeEnum.TI,
  },
  {
    name: 'shared.maps.pt',
    id: DocumentTypeEnum.PT,
  },
];
