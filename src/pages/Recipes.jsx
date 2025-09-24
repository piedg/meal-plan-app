import { useContext, useMemo, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';
import { Button, Modal, Form, InputGroup } from "react-bootstrap";

export default function Recipes() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        filteredIngredients,
        addIngredient,
    } = useContext(GlobalContext);

    return (
        <>
            <h1 className='text-center'>Recipes</h1>
            <div className="d-flex justify-content-center">
                <Button variant="primary" onClick={handleShow}>Add new recipe</Button>
            </div>
            <Modal size='lg' centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Recipe name"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Label>Add ingredient</Form.Label>
                        <InputGroup className='mb-3'>
                            <Form.Control
                                type="text"
                                placeholder="Ingredient name"
                                list="ingredientsList"
                                autoFocus
                            />
                            <datalist id="ingredientsList">
                                {filteredIngredients.map((ingredient) => (
                                    <option key={ingredient.name} value={ingredient.name} />
                                ))}
                            </datalist>

                            <Form.Control
                                type="text"
                                placeholder="Quantity"
                            />
                            <Form.Select aria-label="Ingredient unit select">
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="l">l</option>
                                <option value="ml">ml</option>
                                <option value="unit">unit</option>
                                <option value="tsp">tsp</option>
                            </Form.Select>
                            <Button variant="primary">Add</Button>
                        </InputGroup>
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
