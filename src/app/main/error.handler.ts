import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerImpl implements ErrorHandler {
  constructor(private injector: Injector) { }

  get router(): Router {
    return this.injector.get(Router);
  }

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        alert('Unauthorized!');
      } else if (error.status === 403) {
        this.router.navigateByUrl('/login');
      } else if (error.status === 404) {
        console.log('404');
      }
    } else if (error.valueOf() === 401) {
      alert('Unauthorized!');
    }
  }
}
