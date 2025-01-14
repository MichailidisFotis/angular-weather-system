import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { EditProfile } from '../models/EditProfile.model';


interface Response{
  message:string
}




@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);




  editProfile(user_info:EditProfile){

    //const params = new HttpParams().set('city_name', city_name);

    return this.httpclient.patch<Response>(
      'http://localhost:5000/users/update-user-info',
      {
        new_username:user_info.new_username,
        new_email:user_info.new_email,
        new_firstname:user_info.new_firstname,
        new_surname:user_info.new_surname
      },
      {
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
