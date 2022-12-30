import React, { useEffect, useState } from 'react'
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
                                <Card>
                                    <Card.Img variant="top" src={`/images/${recipe.image}`} />
                                    <Card.Body>
                                        <Card.Title>{recipe.name}</Card.Title>
                                        <Card.Text>
                                            {recipe.description}
                                        </Card.Text>
                                        {(user === recipe.user.email)
                                            ? <Link to={`/recipes/${recipe.id}`} component={{ RecipeView }}>
                                                <Button>{' '}Update</Button></Link>
                                            : null
                                        }
                                    </Card.Body>
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