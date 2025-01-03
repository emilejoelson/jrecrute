export interface User {
  cvFile: string;
  personalInfo: IPersonalInfo;
  professionalInfo: IProfessionalInfo;
  academicInfo: IAcademicInfo;
}

// Personal information
interface IPersonalInfo {
  civility: string;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
}

// Professional information
interface IProfessionalInfo {
  currentPosition: string;
  desiredPosition: string;
  enterprise: string;
  hasRemoteExperience: boolean;
  experiences: Array<IExperience>;
}

//Academin info
interface IAcademicInfo {
  formation: IFormation;
  motivation: string;
}

interface IFormation {
  level: string;
  languages: Array<ILanguage>;
}

interface ILanguage {
  languageone: string;
  levelone: string;
  languagetwo: string;
  leveltwo: string;
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
