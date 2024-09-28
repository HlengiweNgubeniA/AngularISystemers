import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService); // Inject AuthService
  const router = inject(Router); // Inject Router

  if (authService.isLoggedIn()) {
    return true; // Allow access if logged in
  } else {
    router.navigate(['/login']); // Redirect to login page if not logged in
    return false; // Deny access
  }

};
