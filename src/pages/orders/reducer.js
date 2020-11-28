import {
    RESPONSE_VALIDATION,
    RESPONSE_VALIDATION_VIEW,
    RESPONSE_VALIDATION_UPDATE,
    RESPONSE_VALIDATION_DELETE,
    RESPONSE_VALIDATION_CREATE,
} from "./actions";

const initialState = {};

export const productsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case RESPONSE_VALIDATION:
            return {
                ...state,
                products: action.products,
            };
        case RESPONSE_VALIDATION_VIEW:
            return {
                ...state,
                product: action.product,
            };
        case RESPONSE_VALIDATION_CREATE:
            return {
                ...state,
                products_create: action.products_create,
            };
        case RESPONSE_VALIDATION_UPDATE:
            return {
                ...state,
                products_update: action.products_update,
            };
        case RESPONSE_VALIDATION_DELETE:
            return {
                ...state,
                products_detele: action.products_delete,
            };
        default:
            return state;
    }
};