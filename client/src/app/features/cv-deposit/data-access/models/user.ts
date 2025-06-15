export interface User {
  cvFile: string;
  personalInfo: IPersonalInfo;
  professionalInfo: IProfessionalInfo;
  academicInfo: IAcademicInfo;
}

interface IPersonalInfo {
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

interface IProfessionalInfo {
  currentPosition: string;
  desiredPosition: string;
  enterprise: string;
  hasRemoteExperience: boolean;
  experiences: IExperience[];
}

interface IAcademicInfo {
  formation: IFormation;
  motivation: string;
}

interface IFormation {
  level: string;
  languages: ILanguage[];
}

interface ILanguage {
  language: string;
  level: string;
}

interface IExperience {
  position: string;
  company: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
}

export interface UserResponse {
  users: User[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export interface FileUploadResponse {
  message: string;
  filePath: string;
}