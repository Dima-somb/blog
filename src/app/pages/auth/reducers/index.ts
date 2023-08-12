import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "../action-types";


export interface User {
  _id: any;
  username: string;
  email: string;
  password: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AuthState {
  user: User | null;
}


export const initialAuthState: AuthState = {
  user: null,
}


export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, (state, action) => {
    return {
      user: action.user,
    }
  }),

  on(AuthActions.logout, (state, action) => {
    return {
      user: null,
    }
  }),
);

