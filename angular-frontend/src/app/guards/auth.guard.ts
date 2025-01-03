import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  var isLoggedin!: boolean;

  var response  =  await firstValueFrom(loginService.isLoggedIn());

  isLoggedin =  response.body?.loggedIn??false



// loginService.isLoggedIn().subscribe({
//     next: (response) => {
//       console.log(response.body?.loggedIn);

//       if (!response.body?.loggedIn) isLoggedin = false;
//       else isLoggedin = true;
//     },
//   });


  if (!isLoggedin) {
    router.navigate(['/']);
    return false;
  }
  else {
    return true};
};
