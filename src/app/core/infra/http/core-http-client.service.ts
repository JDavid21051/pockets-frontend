/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  core-http-client.service.ts
 * File name:    krih-http-client.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import type { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { map, lastValueFrom } from 'rxjs';
import type {
  ApiRequestOptions,
  ApiResponse,
  ApiResponseModel,
} from '@/domain/models/app/api-core.models';
import { ApiExceptionCore } from '@/infra/class/api-exception.class';
import { KRIH_MODULES_CONFIG_TOKEN } from '@/infra/itoken/modules-config.itoken';
import { isNullish } from '@/infra/const/is-nullish.const';

type HttpBodyContentModel = object | Record<string, unknown> | string;

interface HttpVerbParamsModel {
  endpoint: string;
  urlParams?: string;
  body: HttpBodyContentModel;
  options?: ApiRequestOptions;
}

@Injectable({
  providedIn: 'root',
})
export class CoreHttpClientService {
  private readonly httpClient: HttpClient = inject(HttpClient);
  private readonly moduleConfig = inject(KRIH_MODULES_CONFIG_TOKEN);

  private getUrl(endpoint: string): string {
    return this.validateUrl(this.getBaseEndpoint() + endpoint);
  }

  private getHttpHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    headers.append('accept', 'application/json');
    headers.append('content-types', 'application/json');
    return headers;
  }

  private validateUrl(url: string): string {
    url = url.endsWith('/') ? url : `${url}/`;
    return url;
  }

  private getBaseEndpoint(): string {
    return this.validateUrl(this.moduleConfig.baseEndpoint);
  }

  private mapResponse<T>(response: ApiResponse<T>): T {
    console.log(response);
    if (response.success) {
      if (typeof response.data === 'string') return JSON.parse(response.data);
      return response.data;
    }
    throw ApiExceptionCore.createError(response);
  }

  private serializeToURL(url: string, urlParams?: string): string {
    if (isNullish(urlParams)) {
      return url;
    }
    const newUrl = `${url.endsWith('/') ? url : `${url}/`}`;
    return `${newUrl}${urlParams}/`;
    // return `${url.endsWith('/') ? url : `url\`}${urlParams.toString()}`;
  }

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return this.httpClient
      .get<ApiResponse<T>>(url, { headers: headers })
      .pipe(map((data) => this.mapResponse<T>(data)));
  }

  post<TResponse>(endpoint: string, body?: object, options?: ApiRequestOptions) {
    const url = this.getUrl(endpoint);
    const optionsRef: ApiRequestOptions = {
      ...options,
    };
    const headers = optionsRef.headers;
    if (!headers) {
      optionsRef.headers = this.getHttpHeaders();
    }
    return this.httpClient
      .post<ApiResponse<TResponse>>(url, body, optionsRef)
      .pipe(map((data) => this.mapResponse<TResponse>(data)));
  }

  put<TResponse>(params: HttpVerbParamsModel) {
    const { endpoint, urlParams, body, options } = params;
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    const optionsRef: ApiRequestOptions = {
      ...options,
    };
    const headers = optionsRef.headers;
    if (!headers) {
      optionsRef.headers = this.getHttpHeaders();
    }
    const fullEndpoint = this.serializeToURL(url, urlParams);

    return this.httpClient
      .put<ApiResponse<TResponse>>(fullEndpoint, body, optionsRef)
      .pipe(map((data) => this.mapResponse<TResponse>(data)));
  }

  patch<TResponse>(params: HttpVerbParamsModel) {
    const { endpoint, urlParams, body, options } = params;
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    const optionsRef: ApiRequestOptions = {
      ...options,
    };
    const headers = optionsRef.headers;
    if (!headers) {
      optionsRef.headers = this.getHttpHeaders();
    }
    const fullEndpoint = this.serializeToURL(url, urlParams);

    return this.httpClient
      .patch<ApiResponse<TResponse>>(fullEndpoint, body, optionsRef)
      .pipe(map((data) => this.mapResponse<TResponse>(data)));
  }

  delete<TResponse>(params: HttpVerbParamsModel) {
    const { endpoint, urlParams, options } = params;
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    const optionsRef: ApiRequestOptions = {
      ...options,
    };
    const headers = optionsRef.headers;
    if (!headers) {
      optionsRef.headers = this.getHttpHeaders();
    }
    const fullEndpoint = this.serializeToURL(url, urlParams);

    return this.httpClient
      .delete<ApiResponse<TResponse>>(fullEndpoint, optionsRef)
      .pipe(map((data) => this.mapResponse<TResponse>(data)));
  }

  async asyncGet<T>(endpoint: string, headers?: HttpHeaders): Promise<ApiResponseModel<T>> {
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    const newResponse: ApiResponseModel<T> = {
      status: 500,
    };
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    await lastValueFrom(
      this.httpClient.get<T>(url, {
        headers: headers,
        observe: 'response',
      }),
    )
      .then((response: HttpResponse<T>) => {
        newResponse.status = response.status;
        newResponse.body = response.body;
      })
      .catch((errorResponse: HttpErrorResponse) => {
        newResponse.status = errorResponse.status;
        newResponse.errorMessage = String(errorResponse.error.message);
        newResponse.errorCode = String(errorResponse.error.detail);
      });
    return newResponse;
  }

  async asyncPost<T>(
    endpoint: string,
    body?: object,
    headers?: HttpHeaders,
  ): Promise<ApiResponseModel<T>> {
    const url = this.getUrl(endpoint);
    const newResponse: ApiResponseModel<T> = {
      status: 500,
    };
    // Build a header
    if (!headers) {
      headers = this.getHttpHeaders();
    }

    await lastValueFrom(
      this.httpClient.post<T>(url, body, {
        headers: headers,
        observe: 'response',
      }),
    )
      .then((response: HttpResponse<T>) => {
        newResponse.status = response.status;
        newResponse.body = response.body;
      })
      .catch((errorResponse: HttpErrorResponse) => {
        newResponse.status = errorResponse.status;
        newResponse.errorMessage = String(errorResponse.error.message);
        newResponse.errorCode = String(errorResponse.error.detail);
      });
    return newResponse;
  }

  async asyncPut(
    endpoint: string,
    body?: object,
    headers?: HttpHeaders,
  ): Promise<HttpResponse<object>> {
    const url = this.getUrl(endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return await lastValueFrom<HttpResponse<object>>(
      this.httpClient.put<HttpResponse<object>>(url, body, {
        headers: headers,
        observe: 'response',
      }),
    );
  }

  async asyncPatch(
    endpoint: string,
    body?: object,
    headers?: HttpHeaders,
  ): Promise<HttpResponse<object>> {
    const url = this.getUrl(endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return await lastValueFrom<HttpResponse<object>>(
      this.httpClient.patch<HttpResponse<object>>(url, body, {
        headers: headers,
        observe: 'response',
      }),
    );
  }
}
