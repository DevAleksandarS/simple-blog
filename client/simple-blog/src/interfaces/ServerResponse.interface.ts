export interface UsersExistInterface {
  exist: boolean;
  message: string;
}

export interface CreateAdminInterface {
  userId?: number;
  message: string;
  error?: string;
}

export interface UserLoginInterface {
  id?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  error?: string;
}

export interface UserLogoutInterface {
  logout?: boolean;
}
