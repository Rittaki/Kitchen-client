import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/utilLocalStorage';

function RecipeView() {
    // const location = useLocation();
    // const recipe = location.state.recipe;
    const [recipe, setRecipe] = useState(null);
    const recipeId = window.location.href.split('/recipes/')[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [user, setUser] = useLocalState("", "user");

    function updateRecipe(prop, value) {
        const newRecipe = { ...recipe };
        newRecipe[prop] = value;
        setRecipe(newRecipe);
    }

    useEffect(() => {
        ajax(`/api/recipe/${recipeId}`, "GET", jwt)
        .then((recipeData) => {
            setRecipe(recipeData);
        });
    }, [])

    function saveRecipe() {
        ajax(`/api/recipe/${recipeId}`, "PUT", jwt, recipe)
            .then((recipeData) => {
                // setRecipe(recipeData);
                console.log(recipeData);
            });
    }

    return (
        <div>
            {recipe ? (
                <div><h2>Recipe {recipeId}</h2>
                    {(user === recipe.user.email)
                        ? (<div>
                            <h1>{recipe.name}</h1>
                            <h4>Name of recipe: <input type="text" id="name" name="name"
                                value={recipe.name} onChange={(e) => updateRecipe("name", e.target.value)} /></h4>
                            <br />
                            <h4>Change description: <input type="text" id="recipe-description" name="recipes-description"
                                value={recipe.description} onChange={(e) => updateRecipe("description", e.target.value)} /></h4>
                            <br />
                            <h4>Change ingredients: <input type="text" id="recipe-ingredients" name="recipe-ingredients"
                                value={recipe.ingredients} onChange={(e) => updateRecipe("ingredients", e.target.value)} /></h4>
                            <br />
                            <h4>Change directions: <input type="text" id="recipe-directions" name="recipe-directions"
                                value={recipe.directions} onChange={(e) => updateRecipe("directions", e.target.value)} /></h4>
                            <button style={{ width: "auto" }} onClick={() => saveRecipe()}>Submit changes</button>
                        </div>)
                        : <div>
                            <h1>{recipe.name}</h1>
                            <h4>Name of recipe: {recipe.name}</h4>
                            <br />
                            <h4>Description: {recipe.description} </h4>
                            <br />
                            <h4>Ingredients: {recipe.ingredients} </h4>
                            <br />
                            <h4>Directions: {recipe.directions} </h4>
                        </div>}
                </div>)
                : (<div></div>)}
        </div>
    )
}

export default RecipeView