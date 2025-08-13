import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth.slice";
import product from "./product.slice";

const rootReducer = combineReducers({
  auth,
  product,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
