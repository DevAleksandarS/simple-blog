export interface UsersExistInterface {
  exist: boolean;
  message: string;
}

export interface CreateAdminInterface {
  userId?: number;
  message: string;
  error?: string;
}
