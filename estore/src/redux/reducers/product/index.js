import * as actionTypes from "../../actions/product/types";

const initialState = {
  categories: [],
  products: [],
  filteredProduct: [],
};

export const product = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_CATEGORY:
      return {
        ...state,
        categories: action.data,
      };
    case actionTypes.PRODUCT:
      return {
        ...state,
        products: action.data,
      };
    case actionTypes.FILTER_PRODUCT:
      return {
        ...state,
        filteredProduct: action.data,
      };
    default:
      return state;
  }
};
