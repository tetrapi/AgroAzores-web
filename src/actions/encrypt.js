import Config from '../config';
import * as firebase from "firebase/app";
import {Base64} from '../assets/Base64';
var crypto = require('crypto');


export function validateAuth(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
               debug('valid  login',idToken);
                return true;
            }).catch(function(error) {
                debug('error  login',error);
                return false;
            });
        }
    });


}

export function encrypt(text) {
    var cipher = crypto.createCipher(Config.algorithm, Config.AES_KEY);
    var crypted = cipher.update(String(text), 'utf8', 'hex');
    crypted += cipher.final('hex');
    return Base64.encode(crypted);
}

export function decrypt(text) {
    var decipher = crypto.createDecipher(Config.algorithm, Config.AES_KEY);
    var dec = decipher.update(Base64.decode(String(text)), 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

export function debug(name, value) {
    if (Config.debug) {
        console.log(name, value);
    }
}

export function saveItem(key, value) {
    debug(key,value)
    if (value !== null && key !== undefined) {
        localStorage.setItem(key, encrypt(value));
    }
}
export function clearStorage() {
    localStorage.clear();
}

export function getItem(key) {
    const value = localStorage.getItem(key);
    if (key !== 'i18nextLng' && value !== null) {
        debug(key,"Item Decrypted -> " + decrypt(localStorage.getItem(key)));
        try {
            return decrypt(localStorage.getItem(key));
        }catch (e) {
            return false;
        }
    }else if (key === 'i18nextLng'){
        const value = localStorage.getItem(key);
        if(value === 'en-US'){
            return 'PT';
        }else{
            debug(key,"Item Decrypted -> " + value.toUpperCase());
            return value.toUpperCase();
        }
    }
    return false;
}