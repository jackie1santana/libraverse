import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { LiveChatSlice } from '../Components/LiveChat/LiveChatSlice'

const store = configureStore({
  reducer: {
    liveChat: LiveChatSlice.reducer,
  }
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}

export default store