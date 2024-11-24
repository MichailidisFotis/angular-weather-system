import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../../models/login.model';

import { catchError, throwError } from 'rxjs';

type BackendResponseType = {
  message: string;
  login: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  login(login_user: Login) {
    return this.httpclient.post<BackendResponseType>(
      'http://localhost:5000/users/login',
      {
        username:login_user.username,
        password:login_user.password
      },
      {
        observe: 'response',
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


    ;
  }
}
