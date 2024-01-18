import * as actionTypes from "./types";

export const addCartItem = (data) => async (dispatch) => {
  dispatch(_addCartItem(data));
};

export const _addCartItem = (data) => {
  return {
    type: actionTypes.ADD_CART_ITEM,
    data,
  };
};

export const removeCartItem = (data) => async (dispatch) => {
  dispatch(_removeCartItem(data));
};

export const _removeCartItem = (data) => {
  return {
    type: actionTypes.REMOVE_CART_ITEM,
    data,
  };
};
export const _emptyCartItem = () => {
  return {
    type: actionTypes.EMPTY_CART_ITEM,
    data: [],
  };
};
