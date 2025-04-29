
export interface AuthResponse {
    message: string;
    userId: string;
    accessToken: string;
    refreshToken: string;
    role?: string;
    roles?: Role[];
  }

  export interface Role {
    id: string;
    name: string;
  }