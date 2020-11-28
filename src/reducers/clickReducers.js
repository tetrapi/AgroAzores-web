import * as actions from '../actions/actionTypes';

const initialState = {};

export const appReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.VALIDATE_OAUTH:
            return {
                ...state,
                loading: true,
            };
        case actions.VALIDATE_OAUTH_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
            };
        case actions.VALIDATE_OAUTH_FAILURE:
            return {
                ...state,
                loading: false,
                loggedIn: false,
            };
        case actions.LOGGING_IN:
            return {
                ...state,
            };
        case actions.LOGGING_IN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedIn: true,
            };
        case actions.LOGGING_IN_FAILURE:
            return {
                ...state,
                loading: false,
                loggedIn: false,
            };
        default:
            return state;
    }
};


export const editArticleModalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.EDIT_ARTICLE:
            return {
                ...state,
                loading: true,
            };
        case actions.EDIT_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.EDIT_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        case actions.APPROVE_ARTICLE:
            return {
                ...state,
                loading: true,
            };
        case actions.APPROVE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.APPROVE_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export const removeArticleModalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.REMOVE_ARTICLE:
            return {
                ...state,
                loading: true
            };
        case actions.REMOVE_ARTICLE_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actions.REMOVE_ARTICLE_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export const editClassesModalReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case actions.EDIT_CLASS:
            return {
                ...state,
                loading: true,
            };
        case actions.EDIT_CLASS_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case actions.EDIT_CLASS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
