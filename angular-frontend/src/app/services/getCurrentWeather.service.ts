import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';


interface ResponseType{

  forecasts:[]
}



@Injectable({
  providedIn: 'root',
})
export class GetCurrentWeather {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  getCurrentForecasts(){
     return this.httpclient.get<ResponseType>('http://localhost:5000/weather/current-weather',
      {
        withCredentials:true,
        observe: 'response',
      }
     )
  }

}

