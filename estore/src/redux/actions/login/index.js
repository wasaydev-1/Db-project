import * as actionTypes from "./type";

export const login = (data) => async dispatch => {
    dispatch(_login(data));
}

const _login = data => {
    return {
        type: actionTypes.LOGIN,
        data
    }
}