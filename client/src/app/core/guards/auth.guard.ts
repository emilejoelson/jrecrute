import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { TokenService } from "../../authentication/data-access/services/token.service";
import { selectIsAuthenticated } from "../../authentication/data-access/store/selectors/auth.selectors";
import { Observable, of, switchMap, take } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const store = inject(Store);
    const tokenService = inject(TokenService);

    // If no token or expired token, redirect to login
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
        
        // Wait for authentication state to be determined
        return new Observable<boolean>(observer => {
          const timeout = setTimeout(() => {
            observer.next(false);
            observer.complete();
            router.navigate(['/connexion']);
          }, 2000); 
          
          const subscription = store.select(selectIsAuthenticated).pipe(
            take(1)
          ).subscribe(isAuth => {
            clearTimeout(timeout);
            if (isAuth) {
              observer.next(true);
            } else {
              observer.next(false);
              router.navigate(['/connexion']);
            }
            observer.complete();
          });
          
          return () => {
            clearTimeout(timeout);
            subscription.unsubscribe();
          };
        });
      })
    );
};