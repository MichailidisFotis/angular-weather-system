import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { UserNavbarComponent } from '../../general-components/user-navbar/user-navbar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { GetCityForecast } from '../../services/getCityForecast.service';
import { Forecasts } from '../../models/Forecasts.model';
import { MessagesModule } from 'primeng/messages';



@Component({
  selector: 'app-search-forecast',
  standalone: true,
  imports: [UserNavbarComponent, FormsModule , MessagesModule],
  templateUrl: './search-forecast.component.html',
  styleUrl: './search-forecast.component.css',
})
export class SearchForecastComponent {
  getCityForecastService = inject(GetCityForecast);
  //@Output() forecastsChange = new EventEmitter<Forecasts[] | undefined>();
  forecasts = signal<Forecasts[] | undefined>(undefined);

  error!:boolean;
  errMessage!:string;



  forecastReceived !:boolean;

  searchForecast(city:string) {
    var cityName = city;

    this.getCityForecastService.getCityForecasts(cityName).subscribe({
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
}
