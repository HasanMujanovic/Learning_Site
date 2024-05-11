import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const instructorAuthGuardGuard: CanActivateFn = (
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
  return JSON.parse(storage.getItem('role')) != 'admin' ||
    JSON.parse(storage.getItem('user')) == null
    ? router.navigate(['/main'])
    : true;
};
