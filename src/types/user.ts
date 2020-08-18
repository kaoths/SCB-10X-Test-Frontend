export interface User {
  username: string;
}

export interface UserState {
  username: string;
}

export enum UserActions {
  login = "login",
  logout = "logout"
}
