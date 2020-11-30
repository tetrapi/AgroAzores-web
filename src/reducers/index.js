import {
    appReducer,
    editArticleModalReducer,
    removeArticleModalReducer,
    editClassesModalReducer,
} from './clickReducers';

import {combineReducers} from 'redux';
import {RESET_REDUX_STATES} from "../actions/actionTypes";
import {loginReducer} from "../pages/authentication/reducer";
import {productsReducer} from "../pages/orders/reducer";
import {catalogsReducer} from "../pages/catalagos/reducer";

export const Reducers = combineReducers({
    appReducer,
    loginReducer,
    productsReducer,
    editArticleModalReducer,
    catalogsReducer,
    removeArticleModalReducer,
    editClassesModalReducer,
});

export const rootReducer = (state, action) => {
    if (action.type === RESET_REDUX_STATES) {
        state = undefined
    }

    return Reducers(state, action)
};