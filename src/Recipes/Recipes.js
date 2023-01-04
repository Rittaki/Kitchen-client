import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Modal, Row, Form, Card } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import RecipeView from '../RecipeView/RecipeView';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/utilLocalStorage';
import "./Recipes.css"

function Recipes() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [recipes, setRecipes] = useState(null);
    const [user, setUser] = useLocalState("", "user");
    const navigate = useNavigate();

    async function getImage(name, id) {
        // Fetch the image.
        const response = await fetchWithAuthentication(name);

        // Create an object URL from the data.
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        // Update the source of the image.
        const imageElement = document.getElementById(id + name);
        imageElement.src = objectUrl;
        // imageElement.onload = () => URL.revokeObjectUrl(objectUrl);
    }

    function fetchWithAuthentication(name) {
        const headers = new Headers();
        headers.set('Authorization', `Bearer ${jwt}`);
        return fetch(`/api/recipe/?filename=${name}`, { headers });
    }

    function navigateToNewRecipe() {
        // navigate to /recipes/new
        navigate('/recipes/new');
    };

    useEffect(() => {
        ajax("/api/recipe/all", "GET", jwt)
            .then(recipesData => {
                console.log(recipesData);
                setRecipes(recipesData);
            });
    }, []);

    return (
        <div>
            <Row xs={2} md={3} lg={4} className="g-4">
                {recipes ? recipes.map((recipe, key) =>

                    <div key={recipe.id}>
                        <Col>
                            <Link to={`/recipes/${recipe.id}`} >
                                <Card style={{ height: "30rem" }}>
                                    <Card.Img id={recipe.id + recipe.fileData} style={{ height: "18rem", "objectFit": "cover" }} variant="top" src={!recipe.fileData ? `/images/no-image.png` : getImage(recipe.fileData, recipe.id)} />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{recipe.name}</Card.Title>
                                        <Card.Text
                                            style={{
                                                "maxWidth": "30ch", "wordWrap": "break-word",
                                                display: "-webkit-box", "-webkit-line-clamp": "2",
                                                "-webkit-box-orient": "vertical", overflow: "hidden"
                                            }}>
                                            {recipe.description}
                                        </Card.Text >
                                    </Card.Body>
                                    {(user === recipe.user.email)
                                        ? <Link to={`/recipes/${recipe.id}`} component={{ RecipeView }}>
                                            <Button>{' '}Update</Button></Link>
                                        : null
                                    }
                                </Card>
                            </Link>
                        </Col>

                    </div>)
                    : <div></div>}
                <button id='add-recipe-button' onClick={navigateToNewRecipe}>Add new recipe</button>
            </Row>
        </div>
    )
}

export default Recipes