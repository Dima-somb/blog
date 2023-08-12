import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {environment} from "../environments/environment";
import {authReducer, AuthState} from "./pages/auth/reducers";
import {storeLogger} from "ngrx-store-logger";
import {postReducer, PostState} from "./store/reducers/post.reducer";

export interface AppState {
  auth: AuthState;
  posts: PostState
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  posts: postReducer
}

export const logger = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return storeLogger()(reducer);
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [logger] : [];


