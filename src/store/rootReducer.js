import { combineReducers } from "@reduxjs/toolkit";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import uiReducer from "../features/ui/uiSlice";

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  ui: uiReducer,
});

export default rootReducer;
