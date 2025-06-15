export type TBaseResponse<T> = {
  error: string | null;
  result: T;
};

export type RegisterResponse = {
  success: boolean;
};

export interface TServerBaseResponse<T> {
  data: T;
}

export interface Result {
  message: string;
}
