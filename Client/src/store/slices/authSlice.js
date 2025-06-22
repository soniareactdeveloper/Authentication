import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from '../../services/api';


export const updateUserThunk = createAsyncThunk(
  "/auth/update-user",
  async (userData) => {
    const {fullName, password, avatar} = userData
    try {
      const res = await authService.updateUser(fullName, password, avatar);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
);
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
      state.value = null;
    }
  },
   extraReducers: (builder) => {
      builder
       // Update User
        .addCase(updateUserThunk.fulfilled, (state, actions) => {
          state.value = actions.payload;
          localStorage.setItem("user", JSON.stringify(actions.payload));
        })
         
    },
})

// Action creators are generated for each case reducer function
export const { logUserData, logOutData } = authSlice.actions

export default authSlice.reducer