import * as actions from './actionTypes';
// import {NavLink, Link} from 'react-router-dom';
import Config from '../config';
import {Base64} from '../assets/Base64';
// import React from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getItem} from "../actions/encrypt";
import {debug, find} from "../utility/functions";
import {RESET_REDUX_STATES} from "./actionTypes";
import * as urls from '../api';
const crypto = require('crypto');

export function encrypt(text) {
    const cipher = crypto.createCipher(Config.algorithm, Config.AES_KEY);
    let crypted;
    switch (typeof text) {
        case "string":
            crypted = cipher.update(String(text), 'utf8', 'hex');
            break;
        case "boolean":
            crypted = cipher.update(Boolean(text), 'utf8', 'hex');
            break;
        default:
            crypted = cipher.update(String(text), 'utf8', 'hex');
    }
    crypted += cipher.final('hex');
    return Base64.encode(crypted);
}

export function decrypt(text) {
    var decipher = crypto.createDecipher(Config.algorithm, Config.AES_KEY);
    var dec = decipher.update(Base64.decode(String(text)), 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}





export const logoutOauth = (props) => dispatch => {
    localStorage.clear();
    window.location.reload();
    // dispatch({
    //     type: RESET_REDUX_STATES,
    //
    // });
};


// alerts
export function alertSuccess(message) {
    toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}
export function alertUnauthorized(message) {
    toast.warn(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}
export function alertError(message) {
    toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}
export function alertInfo(message) {
    toast.info(message, {
        position: toast.POSITION.BOTTOM_RIGHT
    });
}
