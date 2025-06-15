import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../authentication/data-access/services/token.service';
import { Store } from '@ngrx/store';
import { combineLatest, map, take } from 'rxjs';
import {
  selectIsAdmin,
  selectIsAuthenticated,
} from '../../authentication/data-access/store/selectors/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const tokenService = inject(TokenService);

  if (!tokenService.hasToken() || tokenService.isTokenExpired()) {
    router.navigate(['/connexion']);
    return false;
  }

  return combineLatest([
    store.select(selectIsAuthenticated),
    store.select(selectIsAdmin),
  ]).pipe(
    take(1),
    map(([isAuthenticated, isAdmin]) => {
      if (isAuthenticated && isAdmin) {
        return true;
      }
      if (isAuthenticated) {
        router.navigate(['/']);
        return false;
      }
      router.navigate(['/connexion']);
      return false;
    })
  );
};