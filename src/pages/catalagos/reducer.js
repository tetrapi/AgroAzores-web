import {
    RESPONSE_CATALOGS_PRODUCTION,
    RESPONSE_CATALOGS_STORE,
    RESPONSE_PRODUCTS
} from "./actions";

const initialState = {};

export const catalogsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case RESPONSE_CATALOGS_PRODUCTION:
            return {
                ...state,
                catalogsInProduction: action.catalogsInProduction,
            };
        case RESPONSE_CATALOGS_STORE:
            return {
                ...state,
                catalogsInStore: action.catalogsInStore,
            };
        case RESPONSE_PRODUCTS:
            return {
                ...state,
                products: action.products,
            };
        default:
            return state;
    }
};