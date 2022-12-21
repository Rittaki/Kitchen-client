import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useLocalState } from '../util/utilLocalStorage';
import "./Recipes.css"

function Recipes() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [recipes, setRecipes] = useState(null);

    useEffect(() => {
        fetch("/api/recipe/all", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(recipesData => {
            console.log(recipesData);
            setRecipes(recipesData);
        });
    }, []);

    function createRecipe() {
        fetch('/api/recipe/stam', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
            method: "POST",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(recipe => {
            console.log(recipe);
            // window.location.href = `/recipes/${recipe.id}`;
        });
    }

    return (
        <div>
            <div>
                {recipes ? recipes.map((recipe, key) =>
                    <div key={recipe.id}><Link to={`/recipes/${recipe.id}`} >
                        Recipe's name: {recipe.name}
                    </Link></div>)
                    : <div></div>}
                <button id='add-recipe-button' onClick={() => createRecipe()}>Add new recipe</button>
            </div>
            {/**<Login />*/}
        </div>
    )
}

export default Recipes