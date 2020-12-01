import {
    RESPONSE_ORDERS_COMPLETED,
    RESPONSE_ORDERS_PENDING,
} from "./actions";
import {debug,getItem} from "../../actions/encrypt";
import Config from "../../config.json";
import {alertError, alertSuccess} from "../../actions";
import {RESPONSE_VALIDATION} from "../catalagos/actions";
// import {debug, saveItem, clearStorage, getItem} from '../../actions/encrypt';

const requestInit = (method, body = null, auth = true) => {
    const h = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    if (body !== null) h.body = JSON.stringify(body);
    if (auth) h.headers['Authorization'] = getItem('tokenType') + ' ' + getItem('accessToken');
    debug('h', h)
    return h;
};

function handleRequestErrors(response) {
    console.log(response);
    // if (!response.ok) {
    //     if (response.status === 400) {
    //         alertError(response.statusText);
    //     }
    //     if (response.status === 401) {
    //         alertUnauthorized('Utilizador ou Senha incorretos!');
    //     }
    //     if (response.status === 500) {
    //         alertError(response.statusText);
    //     }
    //     throw new Error("There was an error with the request")
    // }
    return response;
}

export const getOrdersPending = (postData, props) => dispatch => {
    fetch(Config.url + '/api/users/'+getItem('user_id')+'/orders/pending', requestInit("GET", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: RESPONSE_ORDERS_PENDING,
                ordersPending: response,
            })
        })
        .catch(function (error) {

        });
};
export const getOrdersConclued = (postData, props) => dispatch => {
    fetch(Config.url + '/api/users/'+getItem('user_id')+'/orders/completed', requestInit("GET", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: RESPONSE_ORDERS_COMPLETED,
                ordersConclued: response,
            })
        })
        .catch(function (error) {

        });
};
