import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useAxios } from "../components/Services/Axios";

const initialState = {
  data: [],
  filtredData: [],
  loading: true,
  error: null,
};

export const fetchPersonnel = createAsyncThunk("GET_PERSONNEL", async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/personnel");
    if (data.success) {
      return data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
});

export const personnelSlice = createSlice({
  name: "personnel",
  initialState,
  extraReducers: {
    [fetchPersonnel.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchPersonnel.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.filtredData = action.payload;
    },
    [fetchPersonnel.rejected]: (state, action) => {
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

export const { addFilteredData } = personnelSlice.actions;
//reducer
export const personnelReducer = personnelSlice.reducer;
