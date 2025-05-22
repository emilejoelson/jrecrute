import { createSelector } from '@ngrx/store';
import { State } from '../../../../../state/root.state';

export const selectNewsletterContentState = (state: State) => state.newsletterContent;

// Create newsletter selectors
export const selectCreateLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.createLoading
);

export const selectCreateSuccess = createSelector(
  selectNewsletterContentState,
  (state) => state.createSuccess
);

export const selectCreatedNewsletter = createSelector(
  selectNewsletterContentState,
  (state) => state.createdNewsletter
);

export const selectCreateError = createSelector(
  selectNewsletterContentState,
  (state) => state.createError
);

// Newsletter list selectors
export const selectNewsletters = createSelector(
  selectNewsletterContentState,
  (state) => state.newsletters
);

export const selectNewslettersLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.newslettersLoading
);

export const selectNewslettersError = createSelector(
  selectNewsletterContentState,
  (state) => state.newslettersError
);

export const selectPagination = createSelector(
  selectNewsletterContentState,
  (state) => state.pagination
);

// Status-specific newsletter selectors
export const selectDraftNewsletters = createSelector(
  selectNewsletters,
  (newsletters) => newsletters.filter(n => n.status === 'draft')
);

export const selectScheduledNewsletters = createSelector(
  selectNewsletters,
  (newsletters) => newsletters.filter(n => n.status === 'scheduled')
);

export const selectPublishedNewsletters = createSelector(
  selectNewsletters,
  (newsletters) => newsletters.filter(n => n.status === 'published')
);

// Single newsletter selectors
export const selectSelectedNewsletter = createSelector(
  selectNewsletterContentState,
  (state) => state.selectedNewsletter
);

export const selectSelectedNewsletterLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.selectedNewsletterLoading
);

export const selectSelectedNewsletterError = createSelector(
  selectNewsletterContentState,
  (state) => state.selectedNewsletterError
);

// Update newsletter selectors
export const selectUpdateLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.updateLoading
);

export const selectUpdateSuccess = createSelector(
  selectNewsletterContentState,
  (state) => state.updateSuccess
);

export const selectUpdateError = createSelector(
  selectNewsletterContentState,
  (state) => state.updateError
);

// Delete newsletter selectors
export const selectDeleteLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.deleteLoading
);

export const selectDeleteSuccess = createSelector(
  selectNewsletterContentState,
  (state) => state.deleteSuccess
);

export const selectDeleteError = createSelector(
  selectNewsletterContentState,
  (state) => state.deleteError
);

// Send newsletter selectors
export const selectSendLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.sendLoading
);

export const selectSendSuccess = createSelector(
  selectNewsletterContentState,
  (state) => state.sendSuccess
);

export const selectSendError = createSelector(
  selectNewsletterContentState,
  (state) => state.sendError
);

export const selectSendResults = createSelector(
  selectNewsletterContentState,
  (state) => state.sendResults
);

// Image upload selectors
export const selectImageUploadLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.imageUploadLoading
);

export const selectImageUploadSuccess = createSelector(
  selectNewsletterContentState,
  (state) => state.imageUploadSuccess
);

export const selectImageUploadError = createSelector(
  selectNewsletterContentState,
  (state) => state.imageUploadError
);

export const selectUploadedImagePath = createSelector(
  selectNewsletterContentState,
  (state) => state.uploadedImagePath
);

// Analytics selectors
export const selectAnalytics = createSelector(
  selectNewsletterContentState,
  (state) => state.analytics
);

export const selectAnalyticsLoading = createSelector(
  selectNewsletterContentState,
  (state) => state.analyticsLoading
);

export const selectAnalyticsError = createSelector(
  selectNewsletterContentState,
  (state) => state.analyticsError
);

// Combined loading selector
export const selectIsLoading = createSelector(
  selectCreateLoading,
  selectNewslettersLoading,
  selectSelectedNewsletterLoading,
  selectUpdateLoading,
  selectDeleteLoading,
  selectSendLoading,
  selectImageUploadLoading,
  selectAnalyticsLoading,
  (
    createLoading, 
    newslettersLoading, 
    selectedNewsletterLoading,
    updateLoading,
    deleteLoading,
    sendLoading,
    imageUploadLoading,
    analyticsLoading
  ) => 
    createLoading || 
    newslettersLoading || 
    selectedNewsletterLoading || 
    updateLoading || 
    deleteLoading || 
    sendLoading || 
    imageUploadLoading || 
    analyticsLoading
);

export const selectHasError = createSelector(
  selectCreateError,
  selectNewslettersError,
  selectSelectedNewsletterError,
  selectUpdateError,
  selectDeleteError,
  selectSendError,
  selectImageUploadError,
  selectAnalyticsError,
  (
    createError, 
    newslettersError, 
    selectedNewsletterError,
    updateError,
    deleteError,
    sendError,
    imageUploadError,
    analyticsError
  ) => 
    createError !== null || 
    newslettersError !== null || 
    selectedNewsletterError !== null || 
    updateError !== null || 
    deleteError !== null || 
    sendError !== null || 
    imageUploadError !== null || 
    analyticsError !== null
);