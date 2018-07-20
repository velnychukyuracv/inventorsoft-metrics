import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs/index';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, catchError, finalize, filter, take } from 'rxjs/internal/operators';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(public  auth: AuthService, public tokenService: TokenService) {
    }

    /**
     * add token to http requests
     * @param req - http request
     * @param token - token
     */
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({setHeaders: {'Authorization': token}})
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(this.addToken(request, this.tokenService.getToken()['jwtToken'] || ''))
            .pipe(
                catchError((error: HttpEvent<any>) => {
                    if (error instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>error).status) {
                            case 401: {
                                if (error.error === "Bad credentials") {
                                    return throwError(error);
                                }
                                else if (!error.error.indexOf('JWT expired')) {
                                    return this.handle401Error(request, next);
                                }
                            }
                            default :
                                return throwError(error);
                        }
                    } else {
                        return throwError(error);
                    }
                })
            )
    }

    /**
     * have deal with 401 error when token expired
     * @param req - http request
     * @param  next - the next interceptor in the chain
     */
    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);

            return this.tokenService.refreshToken()
                .pipe(
                    switchMap((newToken: string): any => {

                        if (newToken) {
                            this.tokenService.saveToLocalStorage(newToken);
                            this.tokenSubject.next(newToken);
                            return next.handle(this.addToken(req, newToken['jwtToken']));
                        }
                        return this.logoutUser();
                    }),
                    catchError((error): any => {
                        return this.logoutUser();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                )
        } else {
            return this.tokenSubject
                .pipe(
                    filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addToken(req, token));
                    })
                );
        }
    }

    logoutUser() {
        // todo in the header component
    }
}
