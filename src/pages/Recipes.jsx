import { useContext, useMemo, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';
import { Button, Modal, Form, InputGroup, ListGroup } from "react-bootstrap";

export default function Recipes() {
    const [show, setShow] = useState(false);
    const [currentIngredients, setCurrentIngredients] = useState([]);

    const ingredientUnitRef = useRef('');
    const ingredientNameRef = useRef('');
    const ingredientQuantityRef = useRef('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        filteredIngredients,
        addIngredient,
    } = useContext(GlobalContext);

    function addIngredientToRecipe(e) {
        e.preventDefault();
        let ingredientName = ingredientNameRef.current.value;
        let ingredientQuantity = ingredientQuantityRef.current.value;
        let ingredientUnit = ingredientUnitRef.current.value;


        ingredientNameRef.current.value = '';
        ingredientQuantityRef.current.value = '';
        setCurrentIngredients(prev => [...prev, { name: ingredientName, quantity: ingredientQuantity, unit: ingredientUnit }])
    }

    return (
        <>
            <h1 className='text-center'>Recipes</h1>
            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleShow}>NEW RECIPE</Button>
            </div>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Recipe Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="e.g. Tofu burger"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Label>Add ingredient</Form.Label>
                        <InputGroup className='mb-3'>
                            <Form.Control
                                ref={ingredientNameRef}
                                type="text"
                                placeholder="Name"
                                list="ingredientsList"
                                autoFocus
                            />
                            <datalist id="ingredientsList">
                                {filteredIngredients.map((ingredient) => (
                                    <option key={ingredient.name} value={ingredient.name} />
                                ))}
                            </datalist>

                            <Form.Control
                                ref={ingredientQuantityRef}
                                type="text"
                                placeholder="Quantity"
                            />
                            <Form.Select ref={ingredientUnitRef} aria-label="Ingredient unit select">
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="l">l</option>
                                <option value="ml">ml</option>
                                <option value="unit">unit</option>
                                <option value="tsp">tsp</option>
                            </Form.Select>
                            <Button onClick={(e) => addIngredientToRecipe(e)} variant="primary">Add</Button>
                        </InputGroup>
                        <ListGroup>
                            {currentIngredients.map((ingredient) => (
                                <ListGroup.Item
                                    as="li"
                                    key={ingredient.name}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <span style={{ flexBasis: '50%' }}>{ingredient.name}</span>
                                    <span style={{ flexBasis: '50%' }}>{`${ingredient.quantity} ${ingredient.unit}`}</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Form.Group
                            className="mb-3"
                            controlId="addRecipeForm.Instructions"
                        >
                            <Form.Label>Instructions</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {/*}
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>*/}
                    <Button variant="primary" onClick={handleClose}>
                        Save Recipe
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
