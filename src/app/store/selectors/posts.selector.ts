import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostState} from "../reducers/post.reducer";


const selectPostsState = createFeatureSelector<PostState>('posts');

export const selectPostsStore = createSelector(selectPostsState, state => state.posts);

export const selectPostByIdStore = createSelector(selectPostsState, state => state.selectedPost);

export const selectPostsByName = (name: any) => createSelector(selectPostsStore, posts => {
   return posts.filter(({username}) => username === name);
});

export const selectCategories = createSelector(selectPostsState, state => state.categories);

export const selectPostByCategoryName = (categoryName: string) => createSelector(selectPostsStore, (posts) => {
  return posts.filter((post) => {
    return post.categories.some(c => c === categoryName);
  });
});
