import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Subscriber, User } from '../../../../../newsletter/data-access/models/newsletter.types';
import { Store } from '@ngrx/store';
import { State } from '../../../../../../state/root.state';
import { selectAllSubscribersNewsletter, selectSubscribersError, selectSubscribersLoading, selectUsersError, selectUsersLoading, selectUsersWithCv } from '../../../../../newsletter/data-access/store/selectors/newsletter.selectors';
import { NewsletterActions } from '../../../../../newsletter/data-access/store/actions/newsletter.actions';


@Component({
  selector: 'app-newsletter-recipients',
  imports: [CommonModule],
  templateUrl: './newsletter-recipients.component.html',
  styleUrl: './newsletter-recipients.component.scss'
})
export class NewsletterRecipientsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Try direct properties instead of observables
  subscribers: Subscriber[] = [];
  users: User[] = [];
  subscribersLoading = false;
  usersLoading = false;

  // Keep observables for comparison
  subscribers$: Observable<Subscriber[]>;
  usersWithCv$: Observable<User[]>;
  subscribersLoading$: Observable<boolean>;
  usersLoading$: Observable<boolean>;
  subscribersError$: Observable<any>;
  usersError$: Observable<any>;

  activeTab: 'subscribers' | 'users' = 'subscribers';

  constructor(private store: Store<State>) {
    // Initialize observables
    this.subscribers$ = this.store.select(selectAllSubscribersNewsletter);
    this.subscribersLoading$ = this.store.select(selectSubscribersLoading);
    this.subscribersError$ = this.store.select(selectSubscribersError);
    
    this.usersWithCv$ = this.store.select(selectUsersWithCv);
    this.usersLoading$ = this.store.select(selectUsersLoading);
    this.usersError$ = this.store.select(selectUsersError);
  }

  ngOnInit(): void {
    this.loadSubscribers();
    this.loadUsers();

    // Subscribe to state changes and update local properties
    this.subscribers$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('Subscribers received:', data);
      this.subscribers = data || [];
    });

    this.usersWithCv$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('Users received:', data);
      this.users = data || [];
    });

    this.subscribersLoading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.subscribersLoading = loading;
    });

    this.usersLoading$.pipe(takeUntil(this.destroy$)).subscribe(loading => {
      this.usersLoading = loading;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSubscribers(): void {
    this.store.dispatch(NewsletterActions.loadAllSubscribers());
  }

  loadUsers(): void {
    this.store.dispatch(NewsletterActions.loadUsersWithCv());
  }

  selectRecipient(type: 'subscriber' | 'user', recipient: Subscriber | User): void {
    // Handle recipient selection
    console.log('Selected recipient:', { type, recipient });
    
    // You can dispatch an action or emit an event here
    // For example:
    // this.store.dispatch(NewsletterActions.selectRecipient({ type, recipient }));
    // or emit to parent component if needed
  }

  viewCv(user: User): void {
    if (user.cvFile) {
      // Handle CV viewing logic
      console.log('View CV for user:', user);
      
      // You could open the CV in a new tab/window or show in a modal
      // window.open(user.cvFile, '_blank');
    }
  }

  getConfirmedCount(subscribers: Subscriber[] | null): number {
    if (!subscribers || !Array.isArray(subscribers)) return 0;
    return subscribers.filter((sub: Subscriber) => sub.isConfirmed).length;
  }

  getTotalRecipients(subscribers: Subscriber[] | null, users: User[] | null): number {
    const subscriberCount = subscribers && Array.isArray(subscribers) ? subscribers.length : 0;
    const userCount = users && Array.isArray(users) ? users.length : 0;
    return subscriberCount + userCount;
  }

  // TrackBy functions for better performance
  trackBySubscriberId(index: number, subscriber: Subscriber): string {
    return subscriber._id;
  }

  trackByUserId(index: number, user: User): string {
    return user._id;
  }

  // Debug method to check data
  debugData(): void {
    this.subscribers$.subscribe(data => {
      console.log('Subscribers data:', data);
    });
    
    this.usersWithCv$.subscribe(data => {
      console.log('Users data:', data);
    });
  }
}