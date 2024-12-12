import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../data/services/interceptors/auth.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const activatedRoute = inject(ActivatedRoute);

  const userRole = await authService.getUserRole();

  if (userRole && userRole !== null && userRole === 1) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
