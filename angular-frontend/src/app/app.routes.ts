import { Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';


import { authGuard } from './guards/auth.guard';
import { SearchForecastComponent } from './search/search-forecast/search-forecast.component';


export const routes: Routes = [
  {
    path:"",
    component:LoginComponent
},
{
    path:"signup",
    component:RegistrationComponent
},
{
  path:"user/my-cities",
  component:UserPageComponent,
  canActivate:[authGuard]
},
{
  path:"user/my-profile",
  component:UserProfileComponent,
  canActivate:[authGuard]
},
{
  path:"user/search",
  component:SearchForecastComponent,
  canActivate:[authGuard]
},
{
  path:"**",
  redirectTo:''
}
];
