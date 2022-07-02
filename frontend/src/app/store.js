import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

const reducer = {
  auth: authReducer,
  // post: postReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true
})