export interface User {
  _id: string;
  email: string;
  username: string;
}

export interface UserState {
  username: string;
}

export enum UserActions {
  login = "login",
  logout = "logout"
}
