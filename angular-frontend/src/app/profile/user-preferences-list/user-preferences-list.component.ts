import { Component, inject, OnInit, signal } from '@angular/core';
import { GetUserInfoService } from '../../services/getUserInfo.service';
import { DeletePreferenceService } from '../../services/deletePreference.service';


@Component({
  selector: 'app-user-preferences-list',
  standalone: true,
  imports: [],
  templateUrl: './user-preferences-list.component.html',
  styleUrl: './user-preferences-list.component.css',
})
export class UserPreferencesListComponent implements OnInit {
  getUserInfoService = inject(GetUserInfoService);

  deletePreferenceService = inject(DeletePreferenceService);


  userHasPreferences?: boolean;

  preferences = signal<string[] | undefined>(undefined);

  ngOnInit() {
    this.getUserInfoService.getInfo().subscribe({
      next: (response) => {
        console.log('body:' + response.body?.username);

        this.preferences.set(response.body?.preferences);

        console.log(this.preferences());


        if (response.body?.preferences.length == 0)
          this.userHasPreferences = false;
        else this.userHasPreferences = true;
      },
    });
  }


  deletePreference(city_name:string){

    this.deletePreferenceService.deletePreference(city_name).subscribe({
      next: (response) => {
        //console.log('pre:'+this.preferences())


        var updated_preferences =  this.preferences()?.filter((preference)=>preference !== city_name);

        this.preferences.set(updated_preferences);

       // console.log(this.preferences())

        //window.location.reload();

        //this.forecastsChange.emit(this.forecasts());
      },
      // error:((err)=>{

      //   this.error = true;
      //   this.errMessage= err.message ??'Searching Interupted'

      //   window.scrollTo({
      //     top:0,
      //     behavior:'smooth'
      //   }); // Scroll to top after navigation

      // })


    });
  }
}
