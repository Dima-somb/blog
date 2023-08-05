import {createReducer} from "@ngrx/store";


export interface AuthState {
  user: any;
}


export const initialAuthState:AuthState = {
  user: undefined
}
export const authReducer = createReducer({
  // initialAuthState
})

