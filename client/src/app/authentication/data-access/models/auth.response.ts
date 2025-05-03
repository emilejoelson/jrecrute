import { User } from "../../signup/data-access/models/user";

export interface AuthResponse {
  message: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  role?: string;
  roles?: Role[];
  user?:User;
}

export interface Role {
  id: string;
  name: string;
}

export interface UserProfileResponse {
  email: string;
  profileImage: string;
  firstName: string;
  lastName: string;
}
