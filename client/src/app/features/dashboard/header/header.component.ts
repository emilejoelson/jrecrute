import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, Subject, takeUntil } from 'rxjs';
import { State } from '../../../state/root.state';
import {
  selectFullName,
  selectIsAuthenticated,
  selectProfileImage,
  selectUserEmail,
} from '../../../authentication/data-access/store/selectors/auth.selectors';
import { AuthActions } from '../../../authentication/data-access/store/actions/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;
  profileImageUrl$: Observable<string>;
  private destroy$ = new Subject<void>();
  fullName$: Observable<string>;
  userEmail$: Observable<string>;

  constructor(private store: Store<State>) {
    this.profileImageUrl$ = this.store.select(selectProfileImage);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.fullName$ = this.store.select(selectFullName);
    this.userEmail$ = this.store.select(selectUserEmail);
    
    this.profileImageUrl$
      .pipe(takeUntil(this.destroy$))
      .subscribe((imageUrl) => {
        console.log('Profile Image URL:', imageUrl);
      });

    combineLatest([this.isAuthenticated$])
      .pipe(map(([isAuthenticated]) => isAuthenticated))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.store.dispatch(AuthActions.loadUserProfile());
        }
      });
  }


}
