/*
 * Project:      biodiv-fronend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         10/11/2025
 * Module name:  urls-services.const.ts
 * File name:    urls-services.config
 * IDE:          WebStorm
 */

import type { ApiUrlServiceModel } from '@/domain/models/app/api-url-service.model';

export const URL_SERVICES: ApiUrlServiceModel = {
  auth: {
    base: 'auth/',
    login: 'bG9naW4tYXBw/',
    logout: 'logout/',
    refresh: 'refresh-token/',
    profile: 'profile/get/',
  },
  headlines: {
    base: 'headlines/',
    list: 'list/',
    create: 'create/',
    update: 'update/',
    delete: 'delete/',
  },
} as const;
