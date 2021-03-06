import {
    RESPONSE_CATALOGS_PRODUCTION,
    RESPONSE_CATALOGS_STORE,
    RESPONSE_PRODUCTS
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

export const getCatalogsInStore = (postData, props) => dispatch => {
	console.log("getCatalogsInStore -> ", postData)
    fetch(Config.url + '/api/users/'+getItem('user_id')+'/stock/available', requestInit("GET", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
        	console.log("products for sale -> ", response)
            dispatch({
                type: RESPONSE_CATALOGS_STORE,
                catalogsInStore: response,
            })
        })
        .catch(function (error) {

        });
};
export const getCatalogsInProduction = (postData, props) => dispatch => {
    fetch(Config.url + '/api/users/'+getItem('user_id')+'/stock/future', requestInit("GET", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: RESPONSE_CATALOGS_PRODUCTION,
                catalogsInProduction: response,
            })
        })
        .catch(function (error) {

        });
};
export const getProducts = (postData, props) => dispatch => {
    fetch(Config.url + '/api/products', requestInit("GET", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
            dispatch({
                type: RESPONSE_PRODUCTS,
                products: response,
            })
        })
        .catch(function (error) {

        });
};

export const addProductStock = (postData, props) => dispatch => {
	console.log("addProductStock() props -> ", postData)
	console.log("addProductStock() url -> ", Config.url + '/api/stock')
    fetch(Config.url + '/api/stock', requestInit("POST", postData, true))
        .then(handleRequestErrors)
        .then(response => response.json())
        .then(response => {
        	console.log("response -->", response)
            alertSuccess('Produto adicionado com sucesso!');

        })
        .catch(function (error) {

        });
};

export const getProductStockAvailable = (postData, props) => dispatch => {
	console.log("getProductStockAvailable -> ", postData)
	console.log("url -> ", Config.url + '/api/products/'+ postData.product_id +'/stock/?available=true')
	fetch(Config.url + '/api/products/'+ postData.product_id +'/stock?available=true', requestInit("GET", postData, true))
		.then(handleRequestErrors)
		.then(response => response.json())
		.then(response => {
			console.log("products for sale -> ", response)
			dispatch({
				type: RESPONSE_CATALOGS_STORE,
				catalogsInStore: response,
			})
		})
		.catch(function (error) {

		});
};

export const getProductStockFuture = (postData, props) => dispatch => {
	console.log("getProductStockFuture -> ", postData)
	console.log("url -> ", Config.url + '/api/products/'+ postData.product_id +'/stock/?available=false')
	fetch(Config.url + '/api/products/'+ postData.product_id +'/stock?available=false', requestInit("GET", postData, true))
		.then(handleRequestErrors)
		.then(response => response.json())
		.then(response => {
			console.log("products for sale -> ", response)
			dispatch({
				type: RESPONSE_CATALOGS_PRODUCTION,
				catalogsInStore: response,
			})
		})
		.catch(function (error) {

		});
};
export const addReserve = (postData, id, props) => dispatch => {
	fetch(Config.url + '/api/products/'+id, requestInit("POST", postData, true))
		.then(handleRequestErrors)
		.then(response => response.json())
		.then(response => {
			debug("products for sale -> ", response)
			alertSuccess('Reserva adicionada com sucesso.')
		})
		.catch(function (error) {

		});
};
