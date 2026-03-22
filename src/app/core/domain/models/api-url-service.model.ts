/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/21/2026
 * Module name:  api-url-service.model.ts
 * File name:    api-url-service.model
 * IDE:          WebStorm
 */

export interface ApiUrlAuthModel {
  readonly login: string;
  readonly profile: string;
  readonly logout: string;
}
export interface ApiUrlServiceModel {
  readonly auth: ApiUrlAuthModel;
}
