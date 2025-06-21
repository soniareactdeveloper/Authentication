import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: JSON.parse(localStorage.getItem("user")) || null
  },
  reducers: {
    logUserData: (state, action) => {
      state.value = action.payload
    },
    logOutData : (state) => {
      console.log(state);
    }
  }
})

// Action creators are generated for each case reducer function
export const { logUserData, logOutData } = authSlice.actions

export default authSlice.reducer