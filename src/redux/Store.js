import { configureStore } from "@reduxjs/toolkit";
import { modeReducer } from "./ModeSlices";
import { personnelReducer } from "./PersonnelSlice";
import { armyReducer } from "./Slices/ArmySlice";
import { filterReducer } from "./Slices/FilterSlices";

const store = configureStore({
  reducer: {
    mode: modeReducer,
    personnel: personnelReducer,
    filter: filterReducer,
    army: armyReducer,
  },
});

export default store;
