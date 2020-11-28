import {getItem} from "../actions/encrypt";

export const requestInit = (method, body = null, auth = true) => {
    const h = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    };
    console.log(body);
    if (body !== null) h.body = JSON.stringify(body);
    if (auth) h.headers['Authorization'] = getItem('tokenType') + ' ' + getItem('accessToken');
    return h;
};

export function handleRequestErrors(response) {
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