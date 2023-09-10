import { Injectable } from '@angular/core';
import {catchError, filter, Observable, takeUntil, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlingService {
  customErrorHandling<T>(destroy$: Observable<any>) {
    return (source: Observable<T>): Observable<T> =>
      source.pipe(
        filter(Boolean),
        takeUntil(destroy$),
        catchError((error) => {
          console.log('An error occurred: ', error);
          return throwError(error);
        })
      );
  }

}
