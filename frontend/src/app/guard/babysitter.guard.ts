import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../service/auth.service";

export const babysitterGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('ParentGuard: canActivate called');

  // @ts-ignore
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.role === 'Babysitter') {
    console.log(user);
    return true; // Allow access
  } else {
    // Redirect to login if not authorized
    return router.parseUrl('/login');
  }
};
