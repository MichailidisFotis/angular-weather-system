import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Login } from '../models/login.model';

import { catchError, map, Observable, throwError } from 'rxjs';
import { response } from 'express';

interface ErrorResponseType {
  message: string;
  login: boolean;
};

interface SuccessResponseType{
  jwt:string
  message:string;
  login:boolean;
};

interface CheckLoggedInResponseType{
    loggedIn:boolean
}




@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  login(login_user: Login) {
    return this.httpclient.post<SuccessResponseType>(
      'http://localhost:5000/users/login',
      {
        username:login_user.username,
        password:login_user.password
      },
      {
        withCredentials:true,
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

 isLoggedIn(){
    return this.httpclient.get<CheckLoggedInResponseType>('http://localhost:5000/users/check-logged-in',{
      withCredentials:true,
      observe: 'response',
    });
  }


}
