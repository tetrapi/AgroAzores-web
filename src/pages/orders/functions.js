import {
    RESPONSE_VALIDATION,
    RESPONSE_VALIDATION_VIEW,
    RESPONSE_VALIDATION_CREATE,
    RESPONSE_VALIDATION_UPDATE,
    RESPONSE_VALIDATION_DELETE,
} from "./actions";
import {debug,getItem} from "../../actions/encrypt";
import Config from "../../config.json";
import {alertError, alertSuccess} from "../../actions";
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

export const responseValidation = (postData, props) => dispatch => {
    fetch(Config.url + 'products/count', requestInit("GET", null, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            debug('eco parque view', response)
            if(response.statusCode === 400){
                const responseErrorsID = [];
                for (const error in response.data.errors) {
                    responseErrorsID.push(error);
                    const message = response.data.errors[error][0];
                    alertError(message);
                }

            }if(response.statusCode === 403){
                alert('403');
            }if(response.statusCode === 500){
                alert('500');
            }else{
                fetch(Config.url + 'products?_limit='+response, requestInit("GET", null, true))
                    .then(handleRequestErrors)
                    .then(response => response.json())
                    .then(response => {
                        debug('eco parque view', response)
                        if(response.statusCode === 400){
                            const responseErrorsID = [];
                            for (const error in response.data.errors) {
                                responseErrorsID.push(error);
                                const message = response.data.errors[error][0];
                                alertError(message);
                            }
                            dispatch({
                                type: RESPONSE_VALIDATION,
                                eco_parque_view: false,
                                responseErrorsID: responseErrorsID
                            })
                        }if(response.statusCode === 403){
                            alert('403');
                            dispatch({
                                type: RESPONSE_VALIDATION,
                                eco_parque_view: false
                            })
                        }if(response.statusCode === 500){
                            alert('500');
                            dispatch({
                                type: RESPONSE_VALIDATION,
                                eco_parque_view: false
                            })
                        }else{
                            dispatch({
                                type: RESPONSE_VALIDATION,
                                products:response
                            })
                        }
                    })
                    .catch(function (error) {

                    });
            }
        })
        .catch(function (error) {

        });

};

export const responseValidationCreate = (postData, props) => dispatch => {
    fetch(Config.url + 'products', requestInit("POST", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            if(response.statusCode === 400){
                const responseErrorsID = [];
                for (const error in response.data.errors) {
                    responseErrorsID.push(error);
                    const message = response.data.errors[error][0];
                    alertError(message);
                }
                dispatch({
                    type: RESPONSE_VALIDATION_CREATE,
                    responseValidation: false,
                    responseErrorsID: responseErrorsID
                })
            }if(response.statusCode === 403){
                alert('403');
                dispatch({
                    type: RESPONSE_VALIDATION_CREATE,
                    responseValidation: false
                })
            }if(response.statusCode === 500){
                alert('500');
                dispatch({
                    type: RESPONSE_VALIDATION_CREATE,
                    responseValidation: false
                })
            }else{
                alertSuccess('Produto criado com sucesso!')
                props.history.push('/orders');
                dispatch({
                    type: RESPONSE_VALIDATION_CREATE,
                    responseValidation: true
                })
            }
        })
        .catch(function (error) {

        });
};

export const responseValidationUpdate = (id, postData, props) => dispatch => {
    fetch(Config.url + 'products/'+id, requestInit("PUT", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            if(response.statusCode === 400){
                const responseErrorsID = [];
                for (const error in response.data.errors) {
                    responseErrorsID.push(error);
                    const message = response.data.errors[error][0];
                    alertError(message);
                }
                dispatch({
                    type: RESPONSE_VALIDATION_UPDATE,
                    responseValidation: false,
                    responseErrorsID: responseErrorsID
                })
            }if(response.statusCode === 403){
                alert('403');
                dispatch({
                    type: RESPONSE_VALIDATION_UPDATE,
                    responseValidation: false
                })
            }if(response.statusCode === 500){
                alert('500');
                dispatch({
                    type: RESPONSE_VALIDATION_UPDATE,
                    responseValidation: false
                })
            }else{
                alertSuccess('Produto editado com sucesso!')
                props.history.push('/orders');
                dispatch({
                    type: RESPONSE_VALIDATION_UPDATE,
                    responseValidation: true
                })
            }
        })
        .catch(function (error) {

        });
};

export const responseValidationView = (id, postData, props) => dispatch => {
    fetch(Config.url + 'products/'+ id, requestInit("GET", null, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            if(response.statusCode === 400){
                const responseErrorsID = [];
                for (const error in response.data.errors) {
                    responseErrorsID.push(error);
                    const message = response.data.errors[error][0];
                    alertError(message);
                }
                dispatch({
                    type: RESPONSE_VALIDATION_VIEW,
                    responseValidation: false,
                    responseErrorsID: responseErrorsID
                })
            }if(response.statusCode === 403){
                alert('403');
                dispatch({
                    type: RESPONSE_VALIDATION_VIEW,
                    responseValidation: false
                })
            }if(response.statusCode === 500){
                alert('500');
                dispatch({
                    type: RESPONSE_VALIDATION_VIEW,
                    product: false
                })
            }else{
                dispatch({
                    type: RESPONSE_VALIDATION_VIEW,
                    product: response
                })
            }
        })
        .catch(function (error) {

        });
};

export const responseValidationDelete = (postData, props) => dispatch => {

    fetch(Config.url + 'products/'+ postData, requestInit("DELETE", null, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            if(response.statusCode === 400){
                const responseErrorsID = [];
                for (const error in response.data.errors) {
                    responseErrorsID.push(error);
                    const message = response.data.errors[error][0];
                    alertError(message);
                }
                dispatch({
                    type: RESPONSE_VALIDATION_DELETE,
                    responseValidation: false,
                    responseErrorsID: responseErrorsID
                })
            }if(response.statusCode === 403){
                alert('403');
                dispatch({
                    type: RESPONSE_VALIDATION_DELETE,
                    responseValidation: false
                })
            }if(response.statusCode === 500){
                alert('500');
                dispatch({
                    type: RESPONSE_VALIDATION_DELETE,
                    responseValidation: false
                })
            }else{
                alertSuccess('Produto eliminado com sucesso!')
                window.location.reload();
                dispatch({
                    type: RESPONSE_VALIDATION_DELETE,
                    responseValidation: true
                })
            }
        })
        .catch(function (error) {

        });

};