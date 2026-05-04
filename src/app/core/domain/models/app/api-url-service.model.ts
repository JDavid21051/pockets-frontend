/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/21/2026
 * Module name:  api-url-service.model.ts
 * File name:    api-url-service.model
 * IDE:          WebStorm
 */

export interface ApiUrlBaseModel {
  readonly base: string;
}
export interface ApiUrlAuthModel extends ApiUrlBaseModel {
  readonly login: string;
  readonly profile: string;
  readonly logout: string;
  readonly refresh: string;
}
export interface ApiUrlHeadlinesModel extends ApiUrlBaseModel {
  readonly list: string;
  readonly create: string;
  readonly update: string;
  readonly delete: string;
}
export interface ApiUrlServiceModel {
  readonly auth: ApiUrlAuthModel;
  readonly headlines: ApiUrlHeadlinesModel;
}
