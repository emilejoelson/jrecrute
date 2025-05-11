import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import {
  selectIsAdmin,
  selectIsLoading,
  selectUserProfile,
  selectUserRole,
} from '../../authentication/data-access/store/selectors/auth.selectors';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordPopupComponent } from '../../shared/change-password-popup/change-password-popup.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, TranslateModule, ChangePasswordPopupComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile$!: Observable<any>;
  userRole$!: Observable<string | null>;
  isLoading$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;

  activeTab: string = 'personal';
  isEditMode: boolean = false;

  showPasswordModal: boolean = false;

  togglePasswordModal(state: boolean) {
    this.showPasswordModal = state;
  }

  // For progress calculation
  profileCompletion: number = 0;
  profileSections = [
    {
      id: 'personal',
      name: 'PROFILE.TABS.PERSONAL',
      icon: 'user',
      completed: false,
    },
    {
      id: 'professional',
      name: 'PROFILE.TABS.PROFESSIONAL',
      icon: 'briefcase',
      completed: false,
    },
    {
      id: 'academic',
      name: 'PROFILE.TABS.ACADEMIC',
      icon: 'academic-cap',
      completed: false,
    },
    {
      id: 'settings',
      name: 'PROFILE.TABS.SETTINGS',
      icon: 'cog',
      completed: false,
    },
  ];

  constructor(private store: Store<any>, private router: Router) {}

  ngOnInit(): void {
    this.userProfile$ = this.store.pipe(select(selectUserProfile));
    this.userRole$ = this.store.pipe(select(selectUserRole));
    this.isLoading$ = this.store.pipe(select(selectIsLoading));
    this.isAdmin$ = this.store.pipe(select(selectIsAdmin));

    // Subscribe to profile data to calculate completion
    this.userProfile$.subscribe((profile) => {
      if (profile) {
        this.calculateProfileCompletion(profile);
      }
    });
  }

  calculateProfileCompletion(profile: any): void {
    let completedSections = 0;

    // Check personal info completion
    if (
      profile.personalInfo &&
      profile.personalInfo.firstName &&
      profile.personalInfo.lastName &&
      profile.personalInfo.telephone
    ) {
      this.profileSections[0].completed = true;
      completedSections++;
    }

    // Check professional info completion
    if (
      profile.professionalInfo &&
      profile.professionalInfo.currentPosition &&
      profile.professionalInfo.experiences &&
      profile.professionalInfo.experiences.length > 0
    ) {
      this.profileSections[1].completed = true;
      completedSections++;
    }

    // Check academic info completion
    if (
      profile.academicInfo &&
      profile.academicInfo.formation &&
      profile.academicInfo.formation.level
    ) {
      this.profileSections[2].completed = true;
      completedSections++;
    }

    // Settings are optional, but mark as completed if they've visited
    if (profile.settings && profile.settings.preferencesSet) {
      this.profileSections[3].completed = true;
      completedSections++;
    }

    this.profileCompletion =
      (completedSections / this.profileSections.length) * 100;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  onDownloadCV(): void {
    // Implement CV download logic
    console.log('Downloading CV');
  }

  onEditProfile(): void {
    this.toggleEditMode();
  }

  onSaveProfile(): void {
    // Implement save profile logic
    this.toggleEditMode();
    // dispatch action to save profile
  }

  getProgressBarClass(): string {
    if (this.profileCompletion <= 25) {
      return 'w-1/4 bg-red-500';
    } else if (this.profileCompletion <= 50) {
      return 'w-2/4 bg-yellow-500';
    } else if (this.profileCompletion <= 75) {
      return 'w-3/4 bg-blue-500';
    } else {
      return 'w-full bg-green-500';
    }
  }

  getCivilityLabel(civility: string): string {
    switch (civility) {
      case 'Monsieur':
        return 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MR';
      case 'Madame':
        return 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MRS';
      case 'Mademoiselle':
        return 'CV_DEPOSIT.STEP_1.CIVILITY_OPTIONS.MISS';
      default:
        return '';
    }
  }
}
