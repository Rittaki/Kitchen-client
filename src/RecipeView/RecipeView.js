import React, { useEffect, useState } from 'react'
import { useLocalState } from '../util/utilLocalStorage';

function RecipeView() {
    const recipeId = window.location.href.split('/recipes/')[1];
    const [recipe, setRecipe] = useState(null);
    const [jwt, setJwt] = useLocalState("", "jwt");

    useEffect(() => {
        fetch(`/api/recipe/${recipeId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
            method: "GET",
        }).then(response => {
            if (response.status === 200) return response.json();
        }).then(recipeData => {
            setRecipe(recipeData);
            console.log(recipeData);
            // window.location.href = `/recipes/${recipe.id}`;
        });
    }, [])

    return (
        <div>Recipe {recipeId}
        {recipe ? (
            <div>
            <h2>{recipe.name}</h2>
            </div>
        ) : (
            <div></div>
        )}
        </div>
    )
}

export default RecipeView