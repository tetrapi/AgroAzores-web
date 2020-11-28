import {
    AUTHENTICATE,
} from "./actions";
import {debug, saveItem, clearStorage, getItem} from '../../actions/encrypt';
import * as firebase from "firebase"
import Strapi from 'strapi-sdk-javascript/build/main';
import Config from "../../config.json";
import {alertError, alertSuccess} from "../../actions";

const strapi = new Strapi('http://localhost:1337');


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
    return h;
};

function handleRequestErrors(response) {
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

export const authenticate = (postData, props) => dispatch => {
    alertSuccess('Login efetuado com sucesso!');
    saveItem('loggedIn', true);
    window.location.reload();

    // fetch(Config.url + 'auth/local', requestInit("POST", postData, false))
    //     .then(handleRequestErrors)
    //     .then(response => response.json())
    //     .then(response => {
    //         debug('create counties', response)
    //         if (response.statusCode === 400) {
    //             const responseErrorsID = [];
    //             // for (const error in response.data.errors) {
    //             //     responseErrorsID.push(error);
    //             //     const message = response.data.errors[error][0];
    //             //     alertError(message);
    //             // }
    //             alertError(response.data[0].messages[0].message);
    //             dispatch({
    //                 type: AUTHENTICATE,
    //                 loggedIn: false
    //             });
    //         }else if (response.statusCode === 403) {
    //             alert('403');
    //             dispatch({
    //                 type: AUTHENTICATE,
    //                 loggedIn: false
    //             });
    //         }else if (response.statusCode === 500) {
    //             alert('500');
    //             dispatch({
    //                 type: AUTHENTICATE,
    //                 loggedIn: false
    //             });
    //         } else {
    //             alertSuccess('Login efetuado com sucesso!');
    //             saveItem('tokenType', 'Bearer');
    //             saveItem('accessToken', response.jwt);
    //             saveItem('id', response.user.id);
    //             saveItem('username', response.user.username);
    //             saveItem('email', response.user.email);
    //             saveItem('ecoParque', response.user.eco_parque);
    //             saveItem('role', response.user.role.id);
    //             saveItem('loggedIn', true);
    //             // saveItem('confirmed', response.user.confirmed);
    //             dispatch({
    //                 type: AUTHENTICATE,
    //                 loggedIn: true
    //             });
    //             window.location.reload();
    //         }
    //     })
    //     .catch(function (error) {
    //
    //     });

};
