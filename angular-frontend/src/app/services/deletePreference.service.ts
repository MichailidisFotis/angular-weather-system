import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';


interface Response{
  message:string

}


@Injectable({
  providedIn: 'root',
})
export class DeletePreferenceService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);




  deletePreference(city_name:string){

    const params = new HttpParams().set('city_name', city_name);

    return this.httpclient.delete<Response>(
      'http://localhost:5000/users/delete-city-from-favorites',
      {
        params: params,
        withCredentials: true,
        observe: 'response'
      }
    ).pipe(
          catchError((error: HttpErrorResponse) => {
            // Log the full error for debugging
            console.error('Backend Error:', error);

            // Extract backend error message
            let errorMessage = 'An unknown error occurred';
            if (error.error && error.error.message) {
              errorMessage = error.error.message; // Use the backend message
            }

            // Throw error with meaningful message
            return throwError(() => new Error(errorMessage));
          }));
  }

}
