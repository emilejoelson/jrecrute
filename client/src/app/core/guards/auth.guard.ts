import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TokenService } from "../../authentication/data-access/services/token.service";
import { selectIsAuthenticated } from "../../authentication/data-access/store/selectors/auth.selectors";
import { Observable, map, of, switchMap, take, timer } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const tokenService = inject(TokenService);

  if (!tokenService.hasToken() || tokenService.isTokenExpired()) {
    router.navigate(['/connexion']);
    return false;
  }

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    switchMap(isAuthenticated => {
      if (isAuthenticated) {
        return of(true);
      }
      return timer(2000).pipe(
        switchMap(() => store.select(selectIsAuthenticated).pipe(take(1))),
        map(isAuth => {
          if (!isAuth) {
            router.navigate(['/connexion']);
          }
          return isAuth;
        })
      );
    })
  );
};