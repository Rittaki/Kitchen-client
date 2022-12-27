import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RecipeView from '../RecipeView/RecipeView';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/utilLocalStorage';
import "./Recipes.css"

function Recipes() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [recipes, setRecipes] = useState(null);
    const [user, setUser] = useLocalState("", "user");

    useEffect(() => {
        ajax("/api/recipe/all", "GET", jwt)
        .then(recipesData => {
            console.log(recipesData);
            setRecipes(recipesData);
        });
    }, []);

    function createRecipe() {
        ajax('/api/recipe/stam', "POST", jwt)
        .then(recipe => {
            console.log(recipe);
            window.location.href = `/recipes/${recipe.id}`;
        });
    }

    return (
        <div>
            <div>
                {recipes ? recipes.map((recipe, key) =>
                    <div key={recipe.id}><Link to={`/recipes/${recipe.id}`} >
                        Recipe's name: {recipe.name}
                    </Link>
                    {(user === recipe.user.email)
                    ? <Link to={`/recipes/${recipe.id}`} component={{RecipeView}} 
                    state={{recipe: recipe, id: recipe.id}}>{' '}Update</Link>
                    : null
                    }
                    </div>)
                    : <div></div>}
                <button id='add-recipe-button' onClick={() => createRecipe()}>Add new recipe</button>
            </div>
            {/**<Login />*/}
        </div>
    )
}

export default Recipes