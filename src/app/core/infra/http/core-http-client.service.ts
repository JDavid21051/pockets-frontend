/*
 * Project:      pockets-frontend
 * Developed by: Juan David Pelaez Cumbe
 * Date:         3/23/2026
 * Module name:  core-http-client.service.ts
 * File name:    krih-http-client.service
 * IDE:          WebStorm
 */

import { inject, Injectable } from '@angular/core';
import type {
  HttpContext,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { KRIH_MODULES_CONFIG_TOKEN } from '@/infra/token-config/modules-config.token';
import type { ApiResponse, ApiResponseModel } from '@/domain/models/app/api-core.models';
import { ApiExceptionCore } from '@/infra/class/api-exception.class';

/**
 * Class to encapsulate original HttpClient and incorporate facilities to invoke it.
 */
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

  get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
    const url = this.validateUrl(this.getBaseEndpoint() + endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return this.httpClient.get<T>(url, { headers: headers });
  }

  post<T>(endpoint: string, body?: object, headers?: HttpHeaders, context?: HttpContext) {
    const url = this.getUrl(endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return this.httpClient
      .post<ApiResponse<T>>(url, body, { headers, context })
      .pipe(map((data) => this.mapResponse<T>(data)));
  }

  put(endpoint: string, body?: object, headers?: HttpHeaders): Observable<HttpResponse<object>> {
    const url = this.getUrl(endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return this.httpClient.put<HttpResponse<object>>(url, body, { headers: headers });
  }

  patch(endpoint: string, body?: object, headers?: HttpHeaders): Observable<HttpResponse<object>> {
    const url = this.getUrl(endpoint);
    if (!headers) {
      headers = this.getHttpHeaders();
    }
    return this.httpClient.patch<HttpResponse<object>>(url, body, { headers: headers });
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
