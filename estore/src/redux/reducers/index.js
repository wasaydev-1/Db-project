import { combineReducers } from "redux";
import { topMenu } from "./topMenu";
import { product } from "./product";
import * as cart from "./cart";
import * as login from "./login";

const rootReducer = combineReducers({
  topMenu,
  product,
  ...cart,
  ...login,
});

export default rootReducer;
