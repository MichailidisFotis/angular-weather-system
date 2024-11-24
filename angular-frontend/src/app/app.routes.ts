import { Routes } from '@angular/router';
import { LoginComponent } from './forms/login/login.component';
import { RegistrationComponent } from './forms/registration/registration.component';
import { UserPageComponent } from './user-page/user-page.component';

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
  component:UserPageComponent
},
{
  path:"**",
  redirectTo:''
}
];
