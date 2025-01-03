import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { GetCityForecast } from '../../services/getCityForecast.service';
import { Forecasts } from '../../models/Forecasts.model';



@Component({
  selector: 'app-forecast-card',
  standalone: true,
  imports: [],
  templateUrl: './forecast-card.component.html',
  styleUrl: './forecast-card.component.css'
})
export class ForecastCardComponent {


  @Input({required:true}) city_name!:string;
  @Input({required:true}) time!:string;
  @Input({required:true}) temperature!: number;
  @Input({required:true}) contition!: string;
  @Input({required:true}) wind_speed!: number;
  @Input({required:true}) humidity!: number;
  @Input({required:true}) icon_url!: string;

  getForecastService  =  inject(GetCityForecast);

  forecasts = signal<Forecasts[] |undefined>(undefined);

  @Output() forecastsChange = new EventEmitter< Forecasts[]|undefined>();

  // ngOnChanges(changes: SimpleChanges): void {
  //   this.forecasts
  // }

  onClick(){

    var city =  this.city_name


    this.getForecastService.getCityForecasts(city)
    .subscribe({
      next:((response)=>{

       this.forecasts.set(response.body?.forecasts);
       console.log(this.forecasts())

       this.forecastsChange.emit(this.forecasts())
      }),
    })


  }









}
