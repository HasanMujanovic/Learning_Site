import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
export const authGuardGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router: Router = inject(Router);
  const protectedRoutes: string[] = [
    '/create-course',
    '/course-details/:id',
    '/courses',
  ];
  let storage: Storage = sessionStorage;
  return protectedRoutes.includes(state.url) && storage.getItem('user') == null
    ? router.navigate(['/main'])
    : true;
};
