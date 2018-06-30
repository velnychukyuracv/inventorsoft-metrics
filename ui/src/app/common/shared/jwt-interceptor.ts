import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpResponse,
    HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/internal/operators';

import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(public  auth: AuthService, public tokenService: TokenService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.tokenService.getToken()['jwtToken']
                }
            });
        }
        return next.handle(request)
            .pipe(
                tap((event: HttpEvent<any>) => {

                    if (event instanceof HttpResponse) {
                        //todo stuff with response
                    }
                }, (err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            //TODO find the bug in refreshToken
                            // this.tokenService.refreshToken()
                            //     .subscribe(
                            //         (res) => {
                            //             console.log(res);
                            //             this.tokenService.saveToLocalStorage(res);
                            //         }
                            //     );
                        }
                    }
                })
            )
    }
}
