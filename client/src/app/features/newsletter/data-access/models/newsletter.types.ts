export type RecipientType = 'subscribers' | 'users';
export type ModalStep = 'select-type' | 'select-recipients';

export interface Subscriber {
  _id: string;
  email: string;
  isConfirmed: boolean;
  createdAt: Date;
}

export interface User {
  _id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  cvFile?: string;
  createdAt: Date;
}