import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "../pages/auth/reducers";

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
}

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [] : [];


