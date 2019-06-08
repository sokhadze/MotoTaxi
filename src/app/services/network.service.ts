import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private url = 'http://104.248.44.187:81/api';

  constructor(private http: HttpClient) { }

  static getCookie(cName) {
    if (localStorage.getItem(cName)) {
      return decodeURI(localStorage.getItem(cName));
    }
    return null;
  }

  static setCookie(cName, value) {
    localStorage.setItem(cName, value);
  }

  getUrl(): Observable<any> {
    const jsonFile = 'assets/url.config.json';
    return this.http.get(jsonFile)
        .pipe(map(
            ((response: Response) => {
              this.url = response.url;
            })
        ));
  }


  getRequest(url: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + NetworkService.getCookie('username') + ':' + NetworkService.getCookie('password'));
    return this.http.get(`${this.url}${url}`, {headers: header})
        .pipe(map(
            (response: Response) => {
              return response;
            }), catchError(
            (error: Response) => {
              return throwError(error);
            }));
  }

  postRequest(data: any, url: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', 'Basic ' + NetworkService.getCookie('username') + ':' + NetworkService.getCookie('password'));
    return this.http.post(`${this.url}${url}`, data, {headers: header})
        .pipe(map(
            (response: Response) => {
              return response;
            }), catchError(
            (error: Response) => {
              return throwError(error);
            }));
  }

  putRequest(data: any, url: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + NetworkService.getCookie('access_token'));
    return this.http.put(`${this.url}${url}`, data, {headers: header})
        .pipe(map(
            (response: Response) => {
              return response;
            }),
            catchError(
                (error: Response) => {
                  return throwError(error);
                }));
  }

  deleteRequest(url: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + NetworkService.getCookie('access_token'));
    return this.http.delete(`${this.url}${url}`, {headers: header})
        .pipe(map(
            (response: Response) => {
              return response;
            }), catchError(
            (error: Response) => {
              return throwError(error);
            }));
  }
}
