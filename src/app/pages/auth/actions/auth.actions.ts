import {createAction, props} from "@ngrx/store";
import {User} from "../reducers";

export const login = createAction(
  "[Login Page] User Action",
  props<{user: User, redirect: boolean}>()
)

export const logout = createAction(
  "[Top Menu] Logout"
)
