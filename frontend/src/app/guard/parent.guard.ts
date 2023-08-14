import {CanActivateFn, Router} from '@angular/router';
import {LoginService} from "../service/login.service";
import {inject} from "@angular/core";

export const parentGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  console.log('ParentGuard: canActivate called');

  // @ts-ignore
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.role === 'Parent') {
    console.log(user);
    return true; // Allow access
  } else {
    // Redirect to login if not authorized
    return router.parseUrl('/login');
  }
};
