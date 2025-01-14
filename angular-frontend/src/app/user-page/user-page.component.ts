import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { NoContentCardComponent } from '../general-components/no-content-card/no-content-card.component';
import { GetUserInfoService } from '../services/getUserInfo.service';
import { UserNavbarComponent } from '../general-components/user-navbar/user-navbar.component';
import { emit } from 'process';
import { ForecastCardComponent } from "../forecasts/forecast-card/forecast-card.component";
import { ForecastCardWraperComponent } from "../forecasts/forecast-card-wraper/forecast-card-wraper.component";

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [NoContentCardComponent, UserNavbarComponent, ForecastCardComponent, ForecastCardWraperComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent implements OnInit {

  userHasPreferences!:boolean;
  getUserInfoService  =  inject(GetUserInfoService);

  private destroyRef = inject(DestroyRef);

  username =  ''
  //preferences !:[];


  ngOnInit(){
     this.getUserInfoService.getInfo()
        .subscribe({
        next:((response)=>{

            console.log('body:'+response.body?.username);

            this.username = response.body?.username ??'default'

            if(response.body?.preferences.length ==0)
              this.userHasPreferences = false;
            else
              this.userHasPreferences = true;



        }),
      })

  }





}
