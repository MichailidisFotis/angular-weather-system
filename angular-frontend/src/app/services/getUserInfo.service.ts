import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';


type ResponseType = {
  username:string,
  firtname:string,
  surname:string,
  email:string,
  preferences:string[]
}



@Injectable({
  providedIn: 'root',
})
export class GetUserInfoService {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  getInfo(){
     return this.httpclient.get<ResponseType>('http://localhost:5000/users/get-user-info',
      {
        withCredentials:true,
        observe: 'response',
      }
     )
  }

}
