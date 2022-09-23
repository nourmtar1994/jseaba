import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchArmy = createAsyncThunk("GET_ARMY", async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/army");
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const armySlice = createSlice({
  name: "army",
  initialState,
  extraReducers: {
    [fetchArmy.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchArmy.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchArmy.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
  reducers: {
    addFilteredData: (state, action) => {
      state.filtredData = action?.payload;
    },
  },
});

export const { addFilteredData } = armySlice.actions;
//reducer
export const armyReducer = armySlice.reducer;
