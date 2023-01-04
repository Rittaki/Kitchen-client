import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap'
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
    const [imageToSend, setImageToSend] = useState(null);
    const [image, setImage] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);
    const [toCreate, setToCreate] = useState(false);
    const [goodInput, setGoodInput] = useState(false);

    const categories = ['drink', 'beverage', 'dinner', 'breakfast'];

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
        const recipeObject = {
            'name': name, 'category': category, 'description': description,
            'directions': directions.split(';'), 'ingredients': ingredients.split(',')
        };
        const formData = new FormData();
        formData.append('file', image);
        formData.append('recipe', JSON.stringify(recipeObject));

        console.log(formData);
        fetch('/api/recipe/stam', {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            body: formData,
        })
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
                <Row>
                    <DropdownButton
                        as={ButtonGroup}
                        id="category-name"
                        title={category ? category : "Choose a category"}
                        onSelect={(e) => setCategory(e)}>
                        {categories.map((recipeCategory) => (
                            <Dropdown.Item key={recipeCategory} eventKey={recipeCategory}>
                                {recipeCategory}
                            </Dropdown.Item>))}
                    </DropdownButton>
                </Row>
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

            <Form.Label column="lg" htmlFor='image' >
                Image
            </Form.Label>
            {!goodInput && (<div>Upload an image from your computer</div>)}
            {image && goodInput && (
                <div>
                    {console.log(URL.createObjectURL(image))}
                    <img alt="not found" width={"250px"} src={URL.createObjectURL(image)} />
                    <br />
                </div>
            )}
            {!goodInput && (
                <div>
                    Please choose an <b>image</b> file.
                    <br />
                </div>
            )}
            <Form.Control
                type="file"
                accept="image/png, image/jpeg"
                placeholder="Choose an image"
                onChange={(e) => {
                    console.log(e.target.files[0].type);
                    if (e.target.files[0].type[0] === 'i') {
                        const imageData = new FormData();
                        imageData.append('imageFile', e.target.files[0]);
                        setImage(e.target.files[0]);
                        setImageToSend(imageData);
                        console.log(e.target.files[0]);
                        setGoodInput(true);
                    } else {
                        console.log("not good input");
                        setGoodInput(false);
                    }
                }
                }
            />

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