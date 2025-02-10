import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(private errorService: ErrorService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        const errorCode = error.status;
        this.errorService.setErrorCode(errorCode);
        errorCode != 401 && this.router.navigate(['/error']);
        return throwError(() => new Error(`Error Code: ${errorCode}`));
      })
    )
  }
}
