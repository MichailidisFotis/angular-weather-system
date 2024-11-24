import { DestroyRef, inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { RegisterUser } from '../../models/register.model';
import { catchError, throwError } from 'rxjs';
import { error } from 'console';


type BackendResponse ={message:string, signup:boolean }


@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);




  register(register_user: RegisterUser) {
    return this.httpclient.post<BackendResponse>(
      'http://localhost:5000/users/signup',
      {
        username: register_user.username,
        firstname: register_user.firstname,
        surname: register_user.surname,
        email: register_user.email,
        password: register_user.password,
        verify_password: register_user.confirm_password,
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
  }


}
