import { useContext, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';

import CustomAlert from '../components/CustomAlert.jsx';

import {
    ListGroup,
    DropdownButton,
    Dropdown,
    InputGroup,
    Form,
    Row,
    Button,
} from 'react-bootstrap';

export default function Pantry() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({});
    const { filteredIngredients, addIngredient, deleteIngredient } = useContext(GlobalContext);
    const [quantity, setQuantity] = useState("");

    let ingredientNameRef = useRef('');
    let ingredientQuantityRef = useRef('');
    const ingredientUnitRef = useRef('');

    const nameRegex = /^[a-zA-ZàèéìòùÀÈÉÌÒÙ'\s]+$/;
    const quantityRegex = /^[0-9]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        let ingredientName = ingredientNameRef.current.value;
        let ingredientQuantity = ingredientQuantityRef.current.value;
        let ingredientUnit = ingredientUnitRef.current.value;

        if (!nameRegex.test(ingredientName)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient name',
                body: '',
            });
            return
        }

        if (!quantityRegex.test(ingredientQuantity)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient quantity',
                body: '',
            });
            return
        }

        if (
            ingredientName == undefined ||
            ingredientName == null ||
            ingredientName == ''
        ) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Should insert a ingredient name',
                body: '',
            });
            return;
        }

        if (
            ingredientQuantity == undefined ||
            ingredientQuantity == null ||
            ingredientQuantity == ''
        ) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Should insert a ingredient quantity',
                body: '',
            });
            return;
        }

        const existingIngredient = filteredIngredients.find(
            (ingredient) => ingredient.name.toLowerCase().trim() === ingredientName.toLowerCase().trim()
        );

        if (existingIngredient) {
            setShowAlert(true);
            setAlertMessage({
                header: 'The ingredient already exists',
                body: '',
            });
            return;
        } else {
            const ingredientData = {
                name: ingredientName,
                quantity: ingredientQuantity,
                unit: ingredientUnit,
            };
            addIngredient(ingredientData);
            ingredientNameRef.current.value = "";
            ingredientQuantityRef.current.value = "";
            setShowAlert(false);
        }
    };

    function handleQuantityInput(e) {
        const value = e.target.value;
        if (value.length < 10) {
            setQuantity(value);
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type='text'
                            ref={ingredientNameRef}
                            placeholder="Ingredient name"
                            maxLength={24}
                        />
                        <Form.Control
                            type='number'
                            ref={ingredientQuantityRef}
                            placeholder="Ingredient quantity"
                            value={quantity}
                            onChange={(e) => handleQuantityInput(e)}
                        />
                        <Form.Select
                            ref={ingredientUnitRef}
                            aria-label="Default select example"
                        >
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            <option value="unit">unit</option>
                        </Form.Select>
                        <Button type="submit" variant="primary">
                            Add
                        </Button>
                    </InputGroup>
                </Row>
            </Form>

            {showAlert && (
                <CustomAlert
                    header={alertMessage.header}
                    body={alertMessage.body}
                    variant="danger"
                    onClose={setShowAlert}
                />
            )}

            <ListGroup>
                {filteredIngredients.map((el) => (
                    <ListGroup.Item
                        as="li"
                        key={el.id}
                        className="d-flex justify-content-between"
                    >
                        <span>{el.name}</span>
                        <span>{`${el.quantity} ${el.unit}`}</span>
                        <DropdownButton
                            id="dropdown-basic-button"
                            title="Options"
                        >
                            <Dropdown.Item
                                onClick={() => deleteIngredient(el.id)}
                            >
                                Delete
                            </Dropdown.Item>
                            <Dropdown.Item>Update</Dropdown.Item>
                        </DropdownButton>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}
