export interface UserInfo {
  email: string;
  name: string;
  id: string | null;
  role: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  loading: boolean;
  error: string | null;
  data: Record<string, any>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  userInfo: UserInfo;
}
