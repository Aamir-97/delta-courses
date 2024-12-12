import { inject, Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../data/services/interceptors/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userId = await authService.getUserId();
  const userRole = await authService.getUserRole();

  if (userId && userId !== null && userRole === 0) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
