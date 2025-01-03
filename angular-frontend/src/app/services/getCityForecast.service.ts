import { DestroyRef, inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Forecasts{
  current:Object,
  forecasts:[]

}


@Injectable({
  providedIn: 'root',
})
export class GetCityForecast {
  private httpclient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);




  getCityForecasts(city_name:string){
    
    const params = new HttpParams().set('city_name', city_name);

    return this.httpclient.get<Forecasts>(
      'http://localhost:5000/weather/forecasts',
      {
        params: params,
        withCredentials: true,
        observe: 'response'
      }
    );
  }

}
