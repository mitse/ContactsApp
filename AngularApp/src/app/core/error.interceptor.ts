
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor( ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((err: HttpErrorResponse) => {
                let errorMessage = '';
                if (err.status < 500) {
                    // client-side error
                    console.log(err.error);
                } else {
                    // server-side error
                    errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
                    console.log(`An error occured. Please try later`);
                }

                // const error = err.error.message || err.statusText;
                console.log(errorMessage);
                return throwError(errorMessage);
            }));
    }
}
