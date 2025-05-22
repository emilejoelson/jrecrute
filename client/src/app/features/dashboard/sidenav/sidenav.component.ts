import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { State } from '../../../state/root.state';
import { AuthActions } from '../../../authentication/data-access/store/actions/auth.actions';

interface NavItem {
  id: string;
  svgIcon: string;
  safeIcon: SafeHtml;
  label: string;
  route?: string;
  active: boolean;
  children?: NavItem[];
  isExpanded?: boolean;
  isGroup?: boolean;
  badge?: number;
  description?: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  settingsIcon!: SafeHtml;
  logoutIcon!: SafeHtml;
  hamburgerIcon!: SafeHtml;
  backIcon!: SafeHtml;
  chevronDownIcon!: SafeHtml;
  chevronRightIcon!: SafeHtml;
  plusIcon!: SafeHtml;
  
  private store = inject(Store<State>);
  private router = inject(Router);

  isCollapsed = false;

  @Output() sidebarStateChanged = new EventEmitter<boolean>();

  navItems: NavItem[] = [
    {
      id: 'dashboard',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Dashboard',
      route: '/dashboard',
      active: true,
      isGroup: false,
      description: 'Main overview'
    },
    {
      id: 'communications',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Communications',
      active: false,
      isGroup: true,
      isExpanded: false,
      badge: 3,
      description: 'Email & messaging',
      children: [
        {
          id: 'newsletter',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path><path d="M18 14h-8"></path><path d="M15 18h-5"></path><path d="M10 6h8v4h-8V6Z"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Newsletter',
          route: '/dashboard/newsletter',
          active: false,
          isGroup: false
        },
        {
          id: 'subscribers',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Subscribers',
          route: '/dashboard/subscribers',
          active: false,
          isGroup: false,
          badge: 1247
        },
        {
          id: 'campaigns',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"></path><path d="M8 17l4-4 4 4 6-6"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Campaigns',
          // route: '/dashboard/campaigns',
          active: false,
          isGroup: false
        }
      ]
    },
    {
      id: 'management',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12h.01"></path><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><path d="M22 13a18.15 18.15 0 0 1-20 0"></path><rect width="20" height="14" x="2" y="6" rx="2"></rect></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Management',
      active: false,
      isGroup: true,
      isExpanded: false,
      description: 'User & role management',
      children: [
        {
          id: 'users',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'User Management',
          route: '/dashboard/users',
          active: false,
          isGroup: false
        },
        {
          id: 'roles',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"></path><path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"></path><path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"></path><path d="M12 3c0 1-1 3-3 3s-3-2-3-3 1-3 3-3 3 2 3 3"></path><path d="M12 21c0-1 1-3 3-3s3 2 3 3-1 3-3 3-3-2-3-3"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Roles & Permissions',
          // route: '/dashboard/roles',
          active: false,
          isGroup: false
        }
      ]
    },
    {
      id: 'recruitment',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Recruitment',
      active: false,
      isGroup: true,
      isExpanded: false,
      badge: 12,
      description: 'HR & recruitment tools',
      children: [
        {
          id: 'job-postings',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Job Postings',
          // route: '/dashboard/recruitment',
          active: false,
          isGroup: false
        },
        {
          id: 'applications',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Application Files',
          // route: '/dashboard/applications',
          active: false,
          isGroup: false,
          badge: 12
        },
        {
          id: 'interviews',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Interviews',
          // route: '/dashboard/interviews',
          active: false,
          isGroup: false
        }
      ]
    },
    {
      id: 'analytics',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Analytics & Reports',
      // route: '/statistics',
      active: false,
      isGroup: false,
      description: 'Data insights'
    },
    {
      id: 'finance',
      svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>`,
      safeIcon: null as unknown as SafeHtml,
      label: 'Finance',
      active: false,
      isGroup: true,
      isExpanded: false,
      badge: 5,
      description: 'Financial management',
      children: [
        {
          id: 'invoices',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Invoices',
          // route: '/dashboard/invoices',
          active: false,
          isGroup: false,
          badge: 3
        },
        {
          id: 'payments',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Payments',
          // route: '/dashboard/payments',
          active: false,
          isGroup: false,
          badge: 2
        },
        {
          id: 'budgets',
          svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16 16s-1.5-2-4-2-4 2-4 2"></path><path d="M9 9h.01"></path><path d="M15 9h.01"></path></svg>`,
          safeIcon: null as unknown as SafeHtml,
          label: 'Budget Planning',
          // route: '/dashboard/budgets',
          active: false,
          isGroup: false
        }
      ]
    }
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.initNavItems();
    this.initActionIcons();
  }

  initActionIcons(): void {
    const settingsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`;
    
    const logoutSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`;
    
    const hamburgerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    
    const backSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>`;
    
    const chevronDownSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
    
    const chevronRightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

    const plusSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;

    this.settingsIcon = this.sanitizer.bypassSecurityTrustHtml(settingsSvg);
    this.logoutIcon = this.sanitizer.bypassSecurityTrustHtml(logoutSvg);
    this.hamburgerIcon = this.sanitizer.bypassSecurityTrustHtml(hamburgerSvg);
    this.backIcon = this.sanitizer.bypassSecurityTrustHtml(backSvg);
    this.chevronDownIcon = this.sanitizer.bypassSecurityTrustHtml(chevronDownSvg);
    this.chevronRightIcon = this.sanitizer.bypassSecurityTrustHtml(chevronRightSvg);
    this.plusIcon = this.sanitizer.bypassSecurityTrustHtml(plusSvg);
  }

  logout() {
    console.log('Logging out...');
    this.store.dispatch(AuthActions.logout());
  }

  back() {
    this.router.navigate(['/']);
  }

  onSettings() {
    this.router.navigate(['/parametre/compte']);
    window.scrollTo(0, 0);
  }

  initNavItems() {
    this.initNavItemsRecursive(this.navItems);
  }

  private initNavItemsRecursive(items: NavItem[]) {
    items.forEach((item) => {
      item.safeIcon = this.sanitizer.bypassSecurityTrustHtml(item.svgIcon);
      if (item.children) {
        this.initNavItemsRecursive(item.children);
      }
    });
  }

  setActiveItem(selectedItem: NavItem): void {
    if (selectedItem.isGroup) {
      this.toggleGroup(selectedItem);
    } else {
      this.setActiveRecursive(this.navItems, selectedItem);
      
      const parent = this.findParentItem(this.navItems, selectedItem);
      if (parent) {
        parent.isExpanded = true;
      }
    }
  }

  private setActiveRecursive(items: NavItem[], selectedItem: NavItem): void {
    items.forEach((item) => {
      item.active = item === selectedItem;
      if (item.children) {
        this.setActiveRecursive(item.children, selectedItem);
      }
    });
  }

  private findParentItem(items: NavItem[], childItem: NavItem): NavItem | null {
    for (const item of items) {
      if (item.children?.includes(childItem)) {
        return item;
      }
      if (item.children) {
        const parent = this.findParentItem(item.children, childItem);
        if (parent) return parent;
      }
    }
    return null;
  }

  toggleGroup(groupItem: NavItem): void {
    if (this.isCollapsed) {
      this.toggleSidebar();
    }
    groupItem.isExpanded = !groupItem.isExpanded;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    
    if (this.isCollapsed) {
      this.collapseAllGroups(this.navItems);
    }

    this.sidebarStateChanged.emit(this.isCollapsed);
  }

  private collapseAllGroups(items: NavItem[]): void {
    items.forEach(item => {
      if (item.isGroup) {
        item.isExpanded = false;
      }
      if (item.children) {
        this.collapseAllGroups(item.children);
      }
    });
  }

  hasActiveChild(item: NavItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => child.active || this.hasActiveChild(child));
  }

  onQuickAdd(item: NavItem) {
    console.log('Quick add for:', item.label);
  }

  trackByItemId(index: number, item: NavItem): string {
    return item.id;
  }
}