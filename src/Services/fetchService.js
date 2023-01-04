import React from 'react'
import { useLocalState } from '../util/utilLocalStorage';

function ajax(url, requestMethod, jwt, requestBody, isMultipart) {
    // const [jwt, setJwt] = useLocalState("", "jwt");
    // const [user, setUser] = useLocalState("", "user");
    const fetchData = {
        headers: !isMultipart ? {
            "Content-Type": "application/json"
        } : {},
        method: requestMethod
    }

    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    }

    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    }

    return fetch(url, fetchData)
        .then(response => {
            if (response.status === 200) return response.json();
        })
        
}

export default ajax;