import {
    RESPONSE_ORDERS_COMPLETED,
    RESPONSE_ORDERS_PENDING,
} from "./actions";

const initialState = {};

export const productsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case RESPONSE_ORDERS_COMPLETED:
            return {
                ...state,
                ordersCompleted: action.ordersCompleted,
            };
        case RESPONSE_ORDERS_PENDING:
            return {
                ...state,
                ordersPending: action.ordersPending,
            };
        default:
            return state;
    }
};