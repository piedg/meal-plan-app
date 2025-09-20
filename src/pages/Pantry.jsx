import { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';

import CustomAlert from '../components/CustomAlert.jsx'

import { ListGroup, DropdownButton, Dropdown, InputGroup, Form, Row, Alert, Button } from 'react-bootstrap';

export default function Pantry() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({});
    const { filteredIngredients, addIngredient } = useContext(GlobalContext);

    const ingredientNameRef = useRef('');
    const ingredientQuantityRef = useRef('');
    const ingredientUnitRef = useRef('');

    const handleSubmit = (e) => {
        e.preventDefault();

        let ingredientName = ingredientNameRef.current.value;
        let ingredientQuantity = ingredientQuantityRef.current.value;
        let ingredientUnit = ingredientUnitRef.current.value;

        if (ingredientName == undefined || ingredientName == null || ingredientName == "") {
            setShowAlert(true);
            setAlertMessage({ header: "Should insert a ingredient name", body: "" })
            return
        }

        if (ingredientQuantity == undefined || ingredientQuantity == null || ingredientQuantity == "") {
            setShowAlert(true);
            setAlertMessage({ header: "Should insert a ingredient quantity", body: "" })
            return
        }

        const ingredientData = {
            name: ingredientName,
            quantity: ingredientQuantity,
            unit: ingredientUnit
        }

        addIngredient(ingredientData);
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <InputGroup className="mb-3">
                        <Form.Control ref={ingredientNameRef} placeholder="Ingredient name" />
                        <Form.Control ref={ingredientQuantityRef} placeholder="Ingredient quantity" />
                        <Form.Select ref={ingredientUnitRef} aria-label="Default select example">
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            <option value="unit">unit</option>
                        </Form.Select>
                        <Button type='submit' variant="primary">Add</Button>
                    </InputGroup>
                </Row>
            </Form >

            {showAlert &&
                <CustomAlert header={alertMessage.header} body={alertMessage.body} variant="danger" onClose={setShowAlert} />
            }

            <ListGroup>
                {filteredIngredients.map((el) =>
                    <ListGroup.Item as="li" key={el.id} className="d-flex justify-content-between">
                        <span>{el.name}</span>
                        <span>{`${el.quantity} ${el.unit}`}</span>
                        <DropdownButton id="dropdown-basic-button" title="Options">
                            <Dropdown.Item href="#/action-1">Delete</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Update</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </DropdownButton>
                    </ListGroup.Item>)}
            </ListGroup>
        </>
    );
}
