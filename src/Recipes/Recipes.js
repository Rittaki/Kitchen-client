import React from 'react'
import { useLocalState } from '../util/utilLocalStorage';

function Recipes() {
    const [jwt, setJwt] = useLocalState("", "jwt");

    return (
        <div>
            <div>JWT is {jwt}</div>
            {/**<Login />*/}
        </div>
    )
}

export default Recipes