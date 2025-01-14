import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { UserNavbarComponent } from '../../general-components/user-navbar/user-navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';

import { Forecasts } from '../../models/Forecasts.model';

import { GetCityForecast } from '../../services/getCityForecast.service';
import { AddPreferenceService } from '../../services/addPreference.service';



@Component({
  selector: 'app-search-forecast',
  standalone: true,
  imports: [UserNavbarComponent, FormsModule , MessagesModule],
  templateUrl: './search-forecast.component.html',
  styleUrl: './search-forecast.component.css',
})
export class SearchForecastComponent {
  getCityForecastService = inject(GetCityForecast);
  addPreferenceService =  inject(AddPreferenceService);

  //@Output() forecastsChange = new EventEmitter<Forecasts[] | undefined>();
  forecasts = signal<Forecasts[] | undefined>(undefined);

  error!:boolean;
  errMessage!:string;

  city_name?: string

  forecastReceived !:boolean;
  successMessage: string | undefined;
  successfulAdd?: boolean;

  searchForecast(city:string) {
    this.city_name = city;

    this.getCityForecastService.getCityForecasts(this.city_name).subscribe({
      next: (response) => {
        this.forecasts.set(response.body?.forecasts);
        console.log(this.forecasts());

        this.error = false;
        this.forecastReceived = true;
        //this.forecastsChange.emit(this.forecasts());
      },

      error:((err)=>{

        this.error = true;
        this.errMessage= err.message ??'Searching Interupted'

        window.scrollTo({
          top:0,
          behavior:'smooth'
        }); // Scroll to top after navigation

      })


    });
  }

  addToPreferences(){

    this.addPreferenceService.addPreference(this.city_name).subscribe({
      next: (response) => {
        this.successfulAdd = true;
        this.error = false;
        this.successMessage = response.body?.message;



        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      error: (err) => {
        this.error = true;
        this.errMessage = err.message ?? 'Error Registering user';
        this.successfulAdd = false;

        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
    });


  }


}
