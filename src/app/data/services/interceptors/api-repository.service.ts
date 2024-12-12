import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../app.component';

@Injectable({
  providedIn: 'root',
})
export class ApiRepositoryService {
  constructor(private http: HttpClient) {}

  baseUrl = Environment.apiBaseUrl;

  getAllDataRepository(apiPath: string, params: HttpParams): Observable<any> {
    return new Observable((observer) => {
      try {
        this.http.get<any>(this.baseUrl + apiPath, { params }).subscribe({
          // tslint:disable-next-line: no-shadowed-variable
          next: (data) => {
            observer.next(data);
            observer.complete();
          },
          // tslint:disable-next-line: no-shadowed-variable
          error: (error: HttpErrorResponse) => {
            observer.error(error);
            observer.complete();
          },
        });
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  getDataByIdRepository(apiPath: string, id: number): Observable<any> {
    return new Observable((observer) => {
      try {
        this.http.get<any>(this.baseUrl + apiPath + `/${id}`).subscribe({
          // tslint:disable-next-line: no-shadowed-variable
          next: (data) => {
            observer.next(data);
            observer.complete();
          },
          // tslint:disable-next-line: no-shadowed-variable
          error: (error: HttpErrorResponse) => {
            observer.error(error);
            observer.complete();
          },
        });
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  saveDataRepository(apiPath: string, data: any): Observable<any> {
    return new Observable((observer) => {
      try {
        this.http.post<any>(this.baseUrl + apiPath, data).subscribe({
          // tslint:disable-next-line: no-shadowed-variable
          next: (data) => {
            observer.next(data);
            observer.complete();
          },
          // tslint:disable-next-line: no-shadowed-variable
          error: (error: HttpErrorResponse) => {
            observer.error(error);
            observer.complete();
          },
        });
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  updateDataRepository(
    apiPath: string,
    id: number,
    data: any,
    params?: HttpParams
  ): Observable<any> {
    return new Observable((observer) => {
      try {
        this.http
          .put<any>(this.baseUrl + apiPath + `/${id}`, data, { params: params })
          .subscribe({
            // tslint:disable-next-line: no-shadowed-variable
            next: (data) => {
              observer.next(data);
              observer.complete();
            },
            // tslint:disable-next-line: no-shadowed-variable
            error: (error: HttpErrorResponse) => {
              observer.error(error);
              observer.complete();
            },
          });
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }

  deleteDataRepository(
    apiPath: string,
    id: number,
    body?: any
  ): Observable<any> {
    return new Observable((observer) => {
      try {
        this.http
          .delete<any>(this.baseUrl + apiPath + `/${id}`, { body: body })
          .subscribe({
            // tslint:disable-next-line: no-shadowed-variable
            next: (data) => {
              observer.next(data);
              observer.complete();
            },
            // tslint:disable-next-line: no-shadowed-variable
            error: (error: HttpErrorResponse) => {
              observer.error(error);
              observer.complete();
            },
          });
      } catch (error) {
        observer.error(error);
        observer.complete();
      }
    });
  }
}
