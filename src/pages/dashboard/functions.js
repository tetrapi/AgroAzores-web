import {
	DASHBOARD_GET_PENDING_ARTICLES,
	DASHBOARD_GET_PENDING_ARTICLES_FAILURE,
	DASHBOARD_GET_PENDING_ARTICLES_SUCCESS,
	DASHBOARD_GET_SCHEDULED_ARTICLES,
	DASHBOARD_GET_SCHEDULED_ARTICLES_FAILURE,
	DASHBOARD_GET_SCHEDULED_ARTICLES_SUCCESS, DASHBOARD_PROPS_CHANGED
} from "./actions";


export const dispatchOnDashboardGetPendingArticles = () => dispatch => {
	dispatch({type: DASHBOARD_GET_PENDING_ARTICLES})
};

export const dispatchOnDashboardGetPendingArticlesSuccess = (response) => dispatch => {
	dispatch({
		type: DASHBOARD_GET_PENDING_ARTICLES_SUCCESS,
		articles: response.data,
	})
};

export const dispatchOnDashboardGetPendingArticlesFailure = (error) => dispatch => {
	dispatch({type: DASHBOARD_GET_PENDING_ARTICLES_FAILURE})
};

export const dispatchOnDashboardGetScheduledArticles = () => dispatch => {
	dispatch({type: DASHBOARD_GET_SCHEDULED_ARTICLES})
};

export const dispatchOnDashboardGetScheduledArticlesSuccess = (response) => dispatch => {
	dispatch({
		type: DASHBOARD_GET_SCHEDULED_ARTICLES_SUCCESS,
		articles: response.data,
	})
};

export const dispatchOnDashboardGetScheduledArticlesFailure = (error) => dispatch => {
	dispatch({type: DASHBOARD_GET_SCHEDULED_ARTICLES_FAILURE})
};

export const dispatchOnDashboardClickedArticleIdChanged = (clickedArticleId) => dispatch => {
	dispatch({
		type: DASHBOARD_PROPS_CHANGED,
		clickedArticleId
	})
}