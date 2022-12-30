import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom';
import Recipes from '../Recipes/Recipes';
import ajax from '../Services/fetchService';
import { useLocalState } from '../util/utilLocalStorage';

function NewRecipe() {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [errors, setErrors] = useState({});
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [directions, setDirections] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);
    const [toCreate, setToCreate] = useState(false);

    function submitFunc() {
        // e.preventDefault();
        setIsSubmit(true);
        setErrors(checkErrors());
    }

    function checkErrors() {
        const errors = {}
        if (!name) {
            errors.name = "Name is required";
        }
        if (!category) {
            errors.category = "Category is required";
        }
        if (!description) {
            errors.description = "Description is required";
        }
        if (!ingredients.length) {
            errors.ingredients = "Ingredients is required";
        }
        if (!directions.length) {
            errors.directions = "Directions is required";
        }
        return errors;
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmit) {
            setToCreate(true);
        }
    }, [errors]);

    if (toCreate) {
        const reqBody = {
            name: name,
            category: category,
            description: description,
            directions: directions.split(';'),
            ingredients: ingredients.split(','),
        };

        ajax("/api/recipe/new", "POST", jwt, reqBody)
            .then(recipesData => {
                console.log(recipesData);
            });
        window.location.href = "/recipes";
    }

    return (
        <div><Row >
            <Form.Group as={Col}>
                <Form.Label column="lg" htmlFor='name' >
                    Name
                </Form.Label>
                <Form.Control id='name'
                    size="md" type="text"
                    placeholder="Name of recipe"
                    onChange={(e) => setName(e.target.value)} />
                <p className="error">{errors.name}</p>
            </Form.Group>

            <Form.Group as={Col}>
                <Form.Label column="lg" htmlFor='category' >
                    Category
                </Form.Label>
                <Form.Control id='category'
                    size="md" type="text"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)} />
                <p className="error">{errors.category}</p>
            </Form.Group >
        </Row>

            <Form.Label column="lg" htmlFor='description' >
                Description
            </Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Write a description here"
                onChange={(e) => setDescription(e.target.value)}
            />
            <p className="error">{errors.description}</p>

            <Form.Label column="lg" htmlFor='ingredients' >
                Ingredients
            </Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Use comma (,) to separate between ingredients"
                onChange={(e) => setIngredients(e.target.value)}
            />
            <p className="error">{errors.ingredients}</p>

            <Form.Label column="lg" htmlFor='directions' >
                Directions
            </Form.Label>
            <Form.Control
                as="textarea"
                placeholder="Use semicolon (;) to separate between directions"
                style={{ height: '100px' }}
                onChange={(e) => setDirections(e.target.value)}
            />
            <p className="error">{errors.directions}</p>

            <Button variant="secondary" >
                Close
            </Button>
            <Button variant="primary" onClick={() => submitFunc()}>
                Save Changes
            </Button>
        </div >
    )
}

export default NewRecipe