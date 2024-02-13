import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../state/store'

// Define a type for the slice state
interface LiveChatState {
  value: number
}

// Define the initial state using that type
const initialState: LiveChatState = {
  value: 0,
}

export const LiveChatSlice = createSlice({
  name: 'liveChat',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = LiveChatSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectLiveChat = (state: RootState) => state.liveChat.value

export default LiveChatSlice.reducer