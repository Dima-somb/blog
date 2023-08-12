import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../../environments/environment";
import {authReducer, AuthState} from "../pages/auth/reducers";
import {storeLogger} from "ngrx-store-logger";

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer
}

export const logger = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return storeLogger()(reducer);
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];


