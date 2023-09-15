import {createAction, props} from "@ngrx/store";
import {User} from "../reducers";

const LOGIN_PAGE_USER_ACTION = "[Login Page] User Action";
const TOP_LOGOUT_ACTION = "[Top Menu] Logout";

export const login = createAction(LOGIN_PAGE_USER_ACTION,
  props<{user: User, redirect: boolean}>()
);

export const logout = createAction(
  TOP_LOGOUT_ACTION
);

const GET_USER = "[Home page] Get user";
const GET_USER_SUCCESS = "[Home page] Get user success";
const GET_USER_FAILURE = "[Home page] Get user failure";


export const getUser = createAction(
  GET_USER,
  props<{user: any}>()
);
export const getUserSuccess = createAction(
  GET_USER_SUCCESS,
  props<{user: any}>()
);
export const getUserFailure = createAction(
  GET_USER_FAILURE,
  props<{error: string}>()
);
