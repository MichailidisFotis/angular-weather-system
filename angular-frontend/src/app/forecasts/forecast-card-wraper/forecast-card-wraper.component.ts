import { Component, inject, input, signal } from '@angular/core';
import { ForecastCardComponent } from "../forecast-card/forecast-card.component";
import { GetCurrentWeather } from '../../services/getCurrentWeather.service';
import { CurrentWeather } from '../../models/CurrentWeather.model';
import { Forecasts } from '../../models/Forecasts.model';

@Component({
  selector: 'app-forecast-card-wraper',
  standalone: true,
  imports: [ForecastCardComponent],
  templateUrl: './forecast-card-wraper.component.html',
  styleUrl: './forecast-card-wraper.component.css'
})
export class ForecastCardWraperComponent  {

    getCurrentWeatherService  =  inject(GetCurrentWeather);
    CurrentWeather = signal<CurrentWeather[] | undefined>(undefined);


    forecasts = signal<Forecasts[] | undefined>(undefined);



  ngOnInit(){
    this.getCurrentWeatherService.getCurrentForecasts()
       .subscribe({
       next:((response)=>{

        this.CurrentWeather.set(response.body?.forecasts);
        //console.log(this.forecasts)

       }),
     })

 }


 onForecastsChange(updatedForecasts:Forecasts[] | undefined) {
  this.forecasts.set(updatedForecasts);
}



}
