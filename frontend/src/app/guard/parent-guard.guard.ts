import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "../service/login.service";

export const parentGuardGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  console.log('ParentGuard: canActivate called');

  // Your logic to determine whether the user has access to the route
  // Example: Check if the user role is 'Parent' before allowing access
  const userRole = localStorage.getItem('userRole'); // Assuming you store user role in localStorage
  if (userRole === 'Parent') {
    return true; // Allow access
  } else {
    // Redirect to a different route if not authorized
    return router.parseUrl('/login');
  }
};
