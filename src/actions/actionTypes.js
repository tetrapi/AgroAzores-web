// Http requests ActionTypes

export const RESET_REDUX_STATES = 'RESET_REDUX_STATES';

// Validating user authentication data (restoring sessions)
export const VALIDATE_OAUTH = 'VALIDATE_OAUTH';
export const VALIDATE_OAUTH_SUCCESS = 'VALIDATE_OAUTH_SUCCESS';
export const VALIDATE_OAUTH_FAILURE = 'VALIDATE_OAUTH_FAILURE';

// Validating user authentication data
export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCESS';
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE';

// Fetching the list of schools
export const GET_SCHOOLS = 'GET_SCHOOLS';
export const GET_SCHOOLS_SUCCESS = 'GET_SCHOOLS_SUCCESS';
export const GET_SCHOOLS_FAILURE = 'GET_SCHOOLS_FAILURE';

// Fetching a specific school
export const RETURN_MY_SCHOOL = 'RETURN_MY_SCHOOL';
export const RETURN_MY_SCHOOL_SUCCESS = 'RETURN_MY_SCHOOL';
export const RETURN_MY_SCHOOL_FAILURE = 'RETURN_MY_SCHOOL';

// Fetching the list of school layouts for the articles
export const GET_SCHOOL_LAYOUTS = 'GET_SCHOOL_LAYOUTS';
export const GET_SCHOOL_LAYOUTS_SUCCESS = 'GET_SCHOOL_LAYOUTS_SUCCESS';
export const GET_SCHOOL_LAYOUTS_FAILURE = 'GET_SCHOOL_LAYOUTS_FAILURE';

// Fetching the list of classes
export const GET_CLASSES = 'GET_CLASSES';
export const GET_CLASSES_SUCCESS = 'GET_CLASSES_SUCCESS';
export const GET_CLASSES_FAILURE = 'GET_CLASSES_FAILURE';

// Fetching a specific class
export const GET_CLASS = 'GET_CLASS';
export const GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS';
export const GET_CLASS_FAILURE = 'GET_CLASS_FAILURE';

// Adding classes
export const ADD_CLASS = 'ADD_CLASS';
export const ADD_CLASS_SUCCESS = 'ADD_CLASS_SUCCESS';
export const ADD_CLASS_FAILURE = 'ADD_CLASS_FAILURE';

// Edit a specific class
export const EDIT_CLASS = 'EDIT_CLASS';
export const EDIT_CLASS_SUCCESS = 'EDIT_CLASS_SUCCESS';
export const EDIT_CLASS_FAILURE = 'EDIT_CLASS_FAILURE';

// Fetching the users role
export const RETURN_MY_ROLE = 'RETURN_MY_ROLE';
export const RETURN_MY_ROLE_SUCCESS = 'RETURN_MY_ROLE_SUCCESS';
export const RETURN_MY_ROLE_FAILURE = 'RETURN_MY_ROLE_FAILURE';

// Fetching all the articles
export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_ARTICLES_SUCCESS = 'GET_ARTICLES_SUCCESS';
export const GET_ARTICLES_FAILURE = 'GET_ARTICLES_FAILURE';

// Fetching specific article
export const GET_ARTICLE = 'GET_ARTICLE';
export const GET_ARTICLE_SUCCESS = 'GET_ARTICLE_SUCCESS';
export const GET_ARTICLE_FAILURE = 'GET_ARTICLE_FAILURE';

// Fetching pending articles
export const GET_PENDING_ARTICLES = 'GET_PENDING_ARTICLES';
export const GET_PENDING_ARTICLES_SUCCESS = 'GET_PENDING_ARTICLES_SUCCESS';
export const GET_PENDING_ARTICLES_FAILURE = 'GET_PENDING_ARTICLES_FAILURE';

// Fetching scheduled articles
export const GET_SCHEDULED_ARTICLES = 'GET_SCHEDULED_ARTICLES';
export const GET_SCHEDULED_ARTICLES_SUCCESS = 'GET_SCHEDULED_ARTICLES_SUCCESS';
export const GET_SCHEDULED_ARTICLES_FAILURE = 'GET_SCHEDULED_ARTICLES_FAILURE';

// Create an article
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const CREATE_ARTICLE_SUCCESS = 'CREATE_ARTICLE_SUCCESS';
export const CREATE_ARTICLE_FAILURE = 'CREATE_ARTICLE_FAILURE';

// Create a draft of an article
export const DRAFT_ARTICLE = 'DRAFT_ARTICLE';
export const DRAFT_ARTICLE_SUCCESS = 'DRAFT_ARTICLE_SUCCESS';
export const DRAFT_ARTICLE_FAILURE = 'DRAFT_ARTICLE_FAILURE';

// Edit information about the article
export const EDIT_ARTICLE = 'EDIT_ARTICLE';
export const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
export const EDIT_ARTICLE_FAILURE = 'EDIT_ARTICLE_FAILURE';

// Publish or Unpublish and article
export const PUBLISH_UNPUBLISH_ARTICLE = 'PUBLISH_UNPUBLISH_ARTICLE';
export const PUBLISH_UNPUBLISH_ARTICLE_SUCCESS = 'PUBLISH_UNPUBLISH_ARTICLE_SUCCESS';
export const PUBLISH_UNPUBLISH_ARTICLE_FAILURE = 'PUBLISH_UNPUBLISH_ARTICLE_FAILURE';

// Approve an article
export const APPROVE_ARTICLE = 'APPROVE_ARTICLE';
export const APPROVE_ARTICLE_SUCCESS = 'APPROVE_ARTICLE_SUCCESS';
export const APPROVE_ARTICLE_FAILURE = 'APPROVE_ARTICLE_FAILURE';

// Remove an article
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
export const REMOVE_ARTICLE_FAILURE = 'REMOVE_ARTICLE_FAILURE';

// Get the layouts for the apresentation page
export const GET_LAYOUTS = 'GET_LAYOUTS';
export const GET_LAYOUTS_SUCCESS = 'GET_LAYOUTS_SUCCESS';
export const GET_LAYOUTS_FAILURE = 'GET_LAYOUTS_FAILURE';

// Non http requests ActionTypes

// Used to display the edit modal
export const EDIT_MODE_APPROVE_ARTICLES = 'EDIT_MODE_APPROVE_ARTICLES';
export const EDIT_MODE_MANAGE_ARTICLES = 'EDIT_MODE_MANAGE_ARTICLES';
export const EDIT_MODE_CLASSES = 'EDIT_MODE_CLASSES';
export const EDIT_MODE_PRESENTATION = 'EDIT_MODE_PRESENTATION';
export const EDIT_MODE_DASHBOARD = 'EDIT_MODE_DASHBOARD';

// Used to display the publish modal
export const PUBLISH_MODE = 'PUBLISH_MODE';

// Used to display the remove modal
export const REMOVE_MODE = 'REMOVE_MODE';

// Used for refreshing the table of articles when an article is changed/removed
export const REFRESH_MANAGE_ARTICLES = 'REFRESH_MANAGE_ARTICLES';
export const REFRESH_PENDING_ARTICLES = 'REFRESH_PENDING_ARTICLES';
export const REFRESH_CLASSES = 'REFRESH_CLASSES';
export const REFRESH_PRESENTATION = 'REFRESH_PRESENTATION';

// Used to update the articles common values as props
export const UPDATE_ARTICLE_PROPS = 'UPDATE_ARTICLE_PROPS';

// Used to updated the classes common values as props
export const UPDATE_CLASS_PROPS = 'UPDATE_CLASS_PROPS';

// Used to reset the articles common values as props
export const RESET_ARTICLE_PROPS = 'RESET_ARTICLE_PROPS';




// Dashboard Actions
export const DASHBOARD_UPDATE_PENDING_ARTICLES = 'DASHBOARD_UPDATE_PENDING_ARTICLES';
export const DASHBOARD_UPDATE_SCHEDULED_ARTICLES = 'DASHBOARD_UPDATE_SCHEDULED_ARTICLES';
export const DASHBOARD_UPDATE_PENDING_EDIT_MODE = "DASHBOARD_UPDATE_PENDING_EDIT_MODE";
export const DASHBOARD_UPDATE_SCHEDULED_EDIT_MODE = "DASHBOARD_UPDATE_SCHEDULED_EDIT_MODE";

// Articles Approve Actions
export const APPROVE_UPDATE_ARTICLES = 'DASHBOARD_UPDATE_ARTICLES';
export const APPROVE_UPDATE_EDIT_MODE = "DASHBOARD_UPDATE_EDIT_MODE";
export const APPROVE_UPDATE_REMOVE_MODE = "APPROVE_UPDATE_REMOVE_MODE";

// Articles Manage Actions
export const MANAGE_UPDATE_ARTICLES = 'MANAGE_UPDATE_ARTICLES';
export const MANAGE_UPDATE_EDIT_MODE = "MANAGE_UPDATE_EDIT_MODE";
export const MANAGE_UPDATE_PUBLISH_UNPUBLISH_MODE = "MANAGE_UPDATE_PUBLISH_UNPUBLISH_MODE";
export const MANAGE_UPDATE_REMOVE_MODE = "MANAGE_UPDATE_REMOVE_MODE";
export const MANAGE_UPDATE_MULTIMEDIA_MODE = "MANAGE_UPDATE_MULTIMEDIA_MODE";

// Edit Modal Actions
