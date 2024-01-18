import * as actionTypes from "../../actions/cart/types";

const initialState = {
  item: [],
  itemPriceTotal: 0,
  totalItems: 0,
  totalQuantity: 0,
};

export const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART_ITEM:
      let item_exists = state.item.find((x) => x.Id === action.data.Id);
      if (item_exists) {
        item_exists.quantity += action.data.quantity || 1;
        item_exists.itemtotal = item_exists.price * item_exists.quantity;
        return {
          ...state,
          itemPriceTotal: state.item.reduce((a, b) => a + b.itemtotal || 0, 0),
          totalItems: state.item.length,
          totalQuantity: state.item.reduce((a, b) => a + b.quantity || 0, 0),
        };
      } else {
        let tmpdata = action.data;
        tmpdata.quantity = action.data.quantity || 1;
        tmpdata.itemtotal = tmpdata.price * tmpdata.quantity;

        return {
          ...state,
          item: [...state.item, tmpdata],
          itemPriceTotal:
            state.item.reduce((a, b) => a + b.itemtotal || 0, 0) +
            tmpdata.itemtotal,
          totalItems: state.item.length + 1,
          totalQuantity:
            state.item.reduce((a, b) => a + b.quantity || 0, 0) +
            tmpdata.quantity,
        };
      }
    case actionTypes.REMOVE_CART_ITEM:
      let tmpItem = state.item;
      tmpItem = tmpItem.filter((x) => x.Id !== action.data.Id);
      return {
        ...state,
        item: [...tmpItem],
        itemPriceTotal: tmpItem.reduce((a, b) => a + b.itemtotal || 0, 0),
        totalItems: tmpItem.length,
        totalQuantity: tmpItem.reduce((a, b) => a + b.quantity || 0, 0),
      };
    case actionTypes.EMPTY_CART_ITEM:
      return {
        ...state,
        item: [],
        itemPriceTotal: 0,
        totalItems: 0,
        totalQuantity: 0,
      };
    default:
      return state;
  }
};
