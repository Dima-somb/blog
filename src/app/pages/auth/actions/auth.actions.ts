import {createAction, props} from "@ngrx/store";

export const login = createAction(
  "[Login Page] User Action",
  props<{user: any}>()
)


