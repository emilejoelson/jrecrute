import { Action, createReducer, on } from '@ngrx/store';
import { NewsletterContentActions } from '../actions/newsletter-content.actions';
import { NewsletterContentState } from '../newsletter-content.state';

export const initialNewsletterContentState: NewsletterContentState = {
  // Create
  createLoading: false,
  createSuccess: false,
  createdNewsletter: null,
  createError: null,
  
  // List
  newsletters: [],
  newslettersLoading: false,
  newslettersError: null,
  pagination: {
    total: 0,
    page: 1,
    pages: 0
  },
  
  // Single
  selectedNewsletter: null,
  selectedNewsletterLoading: false,
  selectedNewsletterError: null,
  
  // Update
  updateLoading: false,
  updateSuccess: false,
  updateError: null,
  
  // Delete
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
  
  // Send
  sendLoading: false,
  sendSuccess: false,
  sendError: null,
  sendResults: null,
  
  // Image upload
  imageUploadLoading: false,
  imageUploadSuccess: false,
  imageUploadError: null,
  uploadedImagePath: null,
  
  // Analytics
  analytics: null,
  analyticsLoading: false,
  analyticsError: null
};

export const newsletterContentReducer = createReducer<
  NewsletterContentState,
  Action
>(
  initialNewsletterContentState,

  // Create newsletter
  on(
    NewsletterContentActions.createNewsletter,
    (state: NewsletterContentState) => ({
      ...state,
      createLoading: true,
      createSuccess: false,
      createdNewsletter: null,
      createError: null
    })
  ),
  on(
    NewsletterContentActions.createNewsletterSuccess,
    (state: NewsletterContentState, { response }) => ({
      ...state,
      createLoading: false,
      createSuccess: true,
      createdNewsletter: response.newsletter,
      createError: null
    })
  ),
  on(
    NewsletterContentActions.createNewsletterFailure,
    (state, { error }) => ({
      ...state,
      createLoading: false,
      createSuccess: false,
      createError: error.error
    })
  ),
  on(
    NewsletterContentActions.resetCreateStatus,
    (state) => ({
      ...state,
      createLoading: false,
      createSuccess: false,
      createdNewsletter: null,
      createError: null
    })
  ),

  // Load newsletters
  on(
    NewsletterContentActions.loadNewsletters,
    (state) => ({
      ...state,
      newslettersLoading: true,
      newslettersError: null
    })
  ),
  on(
    NewsletterContentActions.loadNewslettersSuccess,
    (state, { response }) => ({
      ...state,
      newsletters: response.newsletters,
      pagination: response.pagination,
      newslettersLoading: false,
      newslettersError: null
    })
  ),
  on(
    NewsletterContentActions.loadNewslettersFailure,
    (state, { error }) => ({
      ...state,
      newslettersLoading: false,
      newslettersError: error.error
    })
  ),

  // Load single newsletter
  on(
    NewsletterContentActions.loadNewsletter,
    (state) => ({
      ...state,
      selectedNewsletterLoading: true,
      selectedNewsletterError: null
    })
  ),
  on(
    NewsletterContentActions.loadNewsletterSuccess,
    (state, { newsletter }) => ({
      ...state,
      selectedNewsletter: newsletter,
      selectedNewsletterLoading: false,
      selectedNewsletterError: null
    })
  ),
  on(
    NewsletterContentActions.loadNewsletterFailure,
    (state, { error }) => ({
      ...state,
      selectedNewsletterLoading: false,
      selectedNewsletterError: error.error
    })
  ),
  on(
    NewsletterContentActions.clearSelectedNewsletter,
    (state) => ({
      ...state,
      selectedNewsletter: null
    })
  ),

  // Update newsletter
  on(
    NewsletterContentActions.updateNewsletter,
    (state) => ({
      ...state,
      updateLoading: true,
      updateSuccess: false,
      updateError: null
    })
  ),
  on(
    NewsletterContentActions.updateNewsletterSuccess,
    (state, { newsletter }) => ({
      ...state,
      updateLoading: false,
      updateSuccess: true,
      selectedNewsletter: newsletter,
      updateError: null,
      // Update in the list as well
      newsletters: state.newsletters.map(n => 
        n._id === newsletter._id ? newsletter : n
      )
    })
  ),
  on(
    NewsletterContentActions.updateNewsletterFailure,
    (state, { error }) => ({
      ...state,
      updateLoading: false,
      updateSuccess: false,
      updateError: error.error
    })
  ),
  on(
    NewsletterContentActions.resetUpdateStatus,
    (state) => ({
      ...state,
      updateLoading: false,
      updateSuccess: false,
      updateError: null
    })
  ),

  // Delete newsletter
  on(
    NewsletterContentActions.deleteNewsletter,
    (state) => ({
      ...state,
      deleteLoading: true,
      deleteSuccess: false,
      deleteError: null
    })
  ),
  on(
    NewsletterContentActions.deleteNewsletterSuccess,
    (state, { id }) => ({
      ...state,
      deleteLoading: false,
      deleteSuccess: true,
      newsletters: state.newsletters.filter(n => n._id !== id),
      selectedNewsletter: state.selectedNewsletter?._id === id ? null : state.selectedNewsletter,
      deleteError: null
    })
  ),
  on(
    NewsletterContentActions.deleteNewsletterFailure,
    (state, { error }) => ({
      ...state,
      deleteLoading: false,
      deleteSuccess: false,
      deleteError: error.error
    })
  ),
  on(
    NewsletterContentActions.resetDeleteStatus,
    (state) => ({
      ...state,
      deleteLoading: false,
      deleteSuccess: false,
      deleteError: null
    })
  ),

  // Send newsletter
  on(
    NewsletterContentActions.sendNewsletter,
    (state) => ({
      ...state,
      sendLoading: true,
      sendSuccess: false,
      sendResults: null,
      sendError: null
    })
  ),
  on(
    NewsletterContentActions.sendNewsletterSuccess,
    (state, { response }) => ({
      ...state,
      sendLoading: false,
      sendSuccess: true,
      sendResults: response.results,
      sendError: null,
      // Update the status in the selected newsletter if it exists
      selectedNewsletter: state.selectedNewsletter 
        ? { 
            ...state.selectedNewsletter, 
            status: 'published', 
            sentToSubscribers: true, 
            publishDate: new Date(),
            recipientCount: response.results.sent
          } 
        : null,
      // Update the status in the newsletters list if it exists
      newsletters: state.newsletters.map(n => 
        n._id === state.selectedNewsletter?._id 
          ? { 
              ...n, 
              status: 'published', 
              sentToSubscribers: true,
              publishDate: new Date(),
              recipientCount: response.results.sent
            } 
          : n
      )
    })
  ),
  on(
    NewsletterContentActions.sendNewsletterFailure,
    (state, { error }) => ({
      ...state,
      sendLoading: false,
      sendSuccess: false,
      sendError: error.error
    })
  ),
  on(
    NewsletterContentActions.resetSendStatus,
    (state) => ({
      ...state,
      sendLoading: false,
      sendSuccess: false,
      sendResults: null,
      sendError: null
    })
  ),

  // Upload image
  on(
    NewsletterContentActions.uploadImage,
    (state) => ({
      ...state,
      imageUploadLoading: true,
      imageUploadSuccess: false,
      imageUploadError: null,
      uploadedImagePath: null
    })
  ),
  on(
    NewsletterContentActions.uploadImageSuccess,
    (state, { filePath }) => ({
      ...state,
      imageUploadLoading: false,
      imageUploadSuccess: true,
      uploadedImagePath: filePath,
      imageUploadError: null
    })
  ),
  on(
    NewsletterContentActions.uploadImageFailure,
    (state, { error }) => ({
      ...state,
      imageUploadLoading: false,
      imageUploadSuccess: false,
      imageUploadError: error.error
    })
  ),
  on(
    NewsletterContentActions.resetUploadStatus,
    (state) => ({
      ...state,
      imageUploadLoading: false,
      imageUploadSuccess: false,
      imageUploadError: null,
      uploadedImagePath: null
    })
  ),

  // Update image - uses the same loading state as upload
  on(
    NewsletterContentActions.updateImage,
    (state) => ({
      ...state,
      imageUploadLoading: true,
      imageUploadError: null
    })
  ),
  on(
    NewsletterContentActions.updateImageSuccess,
    (state, { response }) => {
      // Update the image in the selected newsletter if it exists
      const updatedSelectedNewsletter = state.selectedNewsletter 
        ? { ...state.selectedNewsletter, image: response.imagePath } 
        : null;
      
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadSuccess: true,
        selectedNewsletter: updatedSelectedNewsletter,
        // If the newsletter is in the list, update it there too
        newsletters: state.newsletters.map(n => 
          n._id === updatedSelectedNewsletter?._id 
            ? { ...n, image: response.imagePath } 
            : n
        ),
        imageUploadError: null
      };
    }
  ),
  on(
    NewsletterContentActions.updateImageFailure,
    (state, { error }) => ({
      ...state,
      imageUploadLoading: false,
      imageUploadSuccess: false,
      imageUploadError: error.error
    })
  ),

  // Delete image
  on(
    NewsletterContentActions.deleteImage,
    (state) => ({
      ...state,
      imageUploadLoading: true,
      imageUploadError: null
    })
  ),
  on(
    NewsletterContentActions.deleteImageSuccess,
    (state, { id }) => {
      // Remove the image from the selected newsletter if it exists
      const updatedSelectedNewsletter = state.selectedNewsletter && state.selectedNewsletter._id === id
        ? { ...state.selectedNewsletter, image: null }
        : state.selectedNewsletter;
      
      return {
        ...state,
        imageUploadLoading: false,
        imageUploadSuccess: true,
        selectedNewsletter: updatedSelectedNewsletter,
        // If the newsletter is in the list, update it there too
        newsletters: state.newsletters.map(n => 
          n._id === id ? { ...n, image: null } : n
        ),
        imageUploadError: null
      };
    }
  ),
  on(
    NewsletterContentActions.deleteImageFailure,
    (state, { error }) => ({
      ...state,
      imageUploadLoading: false,
      imageUploadSuccess: false,
      imageUploadError: error.error
    })
  ),

  // Load analytics
  on(
    NewsletterContentActions.loadAnalytics,
    (state) => ({
      ...state,
      analyticsLoading: true,
      analyticsError: null
    })
  ),
  on(
    NewsletterContentActions.loadAnalyticsSuccess,
    (state, { analytics }) => ({
      ...state,
      analytics,
      analyticsLoading: false,
      analyticsError: null
    })
  ),
  on(
    NewsletterContentActions.loadAnalyticsFailure,
    (state, { error }) => ({
      ...state,
      analyticsLoading: false,
      analyticsError: error.error
    })
  )
);