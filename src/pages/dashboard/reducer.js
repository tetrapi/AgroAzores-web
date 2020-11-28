import {
    DASHBOARD_GET_PENDING_ARTICLES,
    DASHBOARD_GET_PENDING_ARTICLES_FAILURE,
    DASHBOARD_GET_PENDING_ARTICLES_SUCCESS,
    DASHBOARD_GET_SCHEDULED_ARTICLES,
    DASHBOARD_GET_SCHEDULED_ARTICLES_FAILURE,
    DASHBOARD_GET_SCHEDULED_ARTICLES_SUCCESS, DASHBOARD_PROPS_CHANGED
} from "./actions";

const initialState = {
    loadingPending: false,
    loadingScheduled: false,
    pendingArticles: null,
    scheduledArticles: null,
    clickedArticleId: null,
};

export const dashboardReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case DASHBOARD_GET_PENDING_ARTICLES:
            return {
                ...state,
                loadingPending: true,
            };
        case DASHBOARD_GET_PENDING_ARTICLES_SUCCESS:
            return {
                ...state,
                pendingArticles: action.articles,
                loadingPending: false,
            };
        case DASHBOARD_GET_PENDING_ARTICLES_FAILURE:
            return {
                ...state,
                loadingPending: false,
            };
        case DASHBOARD_GET_SCHEDULED_ARTICLES:
            return {
                ...state,
                loadingScheduled: true,
            };
        case DASHBOARD_GET_SCHEDULED_ARTICLES_SUCCESS:
            return {
                ...state,
                scheduledArticles: action.articles,
                loadingScheduled: false,
            };
        case DASHBOARD_GET_SCHEDULED_ARTICLES_FAILURE:
            return {
                ...state,
                loadingScheduled: false,
            };
        case DASHBOARD_PROPS_CHANGED:
            return {
                ...state,
                ...action,
            };
        default:
            return state;
    }
};