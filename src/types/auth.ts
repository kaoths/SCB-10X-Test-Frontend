import { User } from "@/types/user";

export interface AuthState {
  token: string | null;
  user: User | null;
}

export enum AuthActions {
  Login = "Login",
  Logout = "Logout",
  Register = "Register",
  SetToken = "SetToken",
  VerifyToken = "VerifyToken",
  SetAxiosHeader = "SetAxiosHeader",
  ClearHeaderToken = "ClearHeaderToken",
  Redirect = "Redirect"
}

export enum AuthMutations {
  SetToken = "SetToken",
  SetUser = "SetUser"
}

export enum AuthGetters {
  IsLogin = "IsLogin",
  GetToken = "GetToken"
}
export interface LoginCredentials {
  username: string;
  password: string;
}
