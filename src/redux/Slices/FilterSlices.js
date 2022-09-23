import { createSlice } from "@reduxjs/toolkit";

const filterModel = {
  gradeCategory: null,
  ageCategory: null,
  unity: null,
  army: null,
  typeFonction: null,
  grade: null,
};

const initialState = {
  data: filterModel,
  loading: false,
  error: null,
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      state.data[action?.payload?.target] = action?.payload?.value;
    },
    removeFilter: (state, action) => {
      state.data[action?.payload?.target] = action?.payload?.value;
    },
    resetFilter: (state) => {
      state.data = filterModel;
    },
  },
});

export const { addFilter, removeFilter, resetFilter } = filterSlice.actions;
//reducer
export const filterReducer = filterSlice.reducer;
