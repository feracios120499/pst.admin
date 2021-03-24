import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, interval } from 'rxjs';
import { tap, throttleTime, throttle, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenResponse } from '../Models/token.model';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    endpoint: string = '/Ipz/api/';
    host: string = '';



    constructor(
        private router: Router,
        private translate: TranslateService) {
            console.log('AuthInterceptor created');

        }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const requestFormated = this.formatRequest(request);
        return next.handle(requestFormated)
            .pipe(
                map((data) => {

                    return data;
                }),
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        if (event.status == 401) {

                        }
                    }
                }, (err: any) => {

                    if (err instanceof HttpErrorResponse) {

                        if (err.status === 401) {

                        }
                        return throwError(err);
                    }
                })
            );
    }

    formatRequest(request: HttpRequest<any>): HttpRequest<any> {
        // let end_point = this.demoService.isDemo ? `assents/demo/${this.getCurrentLang()}/`:  this.endpoint;
        const tokenJSON = sessionStorage.getItem('userToken');
        let token = '';
        if (tokenJSON) {
            const accesstoken: TokenResponse = JSON.parse(tokenJSON);
            token = accesstoken.access_token;
        }
        const prefix = request.url.indexOf('?') > 0 ? '&_=' : '?_=';

        if (this.isStaticFileRequest(request.url)) {
            request = request.clone({
                url: request.url + prefix + this.customDate(new Date(), '.')
            });
            return request;
        }

        if (this.isDocs(request.url) || this.isLinks(request.url)) {
            request = request.clone({
                url: this.host + request.url + prefix + this.customDate(new Date(), '.')
            });
            return request;
        }

        if (token != '' && !this.isStaticFileRequest(request.url)) {
            request = request.clone({
                url: this.endpoint + request.url + prefix + this.timeStamp(),
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Accept-Language': 'en-US'
                },

            });
        }

        if (token == '' && !this.isStaticFileRequest(request.url)) {
            request = request.clone({
                url: this.endpoint + request.url + prefix + this.timeStamp(),
                setHeaders: {
                    'Accept-Language': 'en-US'
                },
            });
        }
        return request;

    }

    isDocs(url): boolean {
       return url.indexOf('docs') >= 0;
    }

    isLinks(url): boolean {
        return url.indexOf('link') >= 0;
     }


    isStaticFileRequest(url): boolean {
        return url.indexOf('i18n') >= 0 || url.indexOf('config') >= 0 || url.indexOf('.svg') >= 0;
    }

    getCurrentLang(): string {
        return this.translate.currentLang;

    }

    timeStamp(): string {
        return (new Date().getDay() + new Date().getMilliseconds() + new Date().getMonth() + new Date().getMilliseconds()).toString();
    }

    customDate(date: Date, separator: string) {
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();
        return [(dd > 9 ? '' : '0') + dd,
        (mm > 9 ? '' : '0') + mm,
        date.getFullYear(),
        ].join(separator);
    }
}
