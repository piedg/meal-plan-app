import { useContext, useMemo, useRef, useState } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';
import debounce from '../utils/debounce.js';
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
    const {
        filteredIngredients,
        addIngredient,
        deleteIngredient,
        setSearchQuery,
        updateIngredient,
    } = useContext(GlobalContext);
    const [quantity, setQuantity] = useState('');
    const [editingId, setEditingId] = useState(null);

    let ingredientNameRef = useRef('');
    let ingredientQuantityRef = useRef('');
    const ingredientUnitRef = useRef('');
    const editIngredientNameRef = useRef('');
    const editIngredientQuantityRef = useRef('');

    const nameRegex = /^[a-zA-ZàèéìòùÀÈÉÌÒÙ'\s]+$/;
    const quantityRegex = /^[0-9]+$/;

    const debouncedSearchQuery = useMemo(
        () => debounce(setSearchQuery, 500),
        [setSearchQuery]
    );

    function handleSearch(value) {
        debouncedSearchQuery(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let ingredientName = ingredientNameRef.current.value;
        let ingredientQuantity = ingredientQuantityRef.current.value;
        let ingredientUnit = ingredientUnitRef.current.value;

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

        if (!nameRegex.test(ingredientName)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient name',
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
            (ingredient) =>
                ingredient.name.toLowerCase().trim() ===
                ingredientName.toLowerCase().trim()
        );

        if (!quantityRegex.test(ingredientQuantity)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient quantity',
                body: '',
            });
            return;
        }

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
            ingredientNameRef.current.value = '';
            ingredientQuantityRef.current.value = '';
            setShowAlert(false);
        }
    };

    function handleQuantityInput(e) {
        const value = e.target.value;
        if (value.length < 10) {
            setQuantity(value);
        }
    }

    const handleUpdate = (id) => {
        setEditingId(id);
    };

    const handleSave = (id) => {
        const newName = editIngredientNameRef.current.value;
        const newQuantity = editIngredientQuantityRef.current.value;

        if (!nameRegex.test(newName)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient name',
                body: '',
            });
            return;
        }

        if (!quantityRegex.test(newQuantity)) {
            setShowAlert(true);
            setAlertMessage({
                header: 'Invalid ingredient quantity',
                body: '',
            });
            return;
        }

        if (newName.trim() === '' || newQuantity.trim() === '') {
            setShowAlert(true);
            setAlertMessage({
                header: 'Name and quantity cannot be empty',
                body: '',
            });
            return;
        }

        updateIngredient(id, newName, newQuantity);
        setEditingId(null);
        setShowAlert(false);
    };

    return (
        <>
            <div className="my-3">
                <Form.Control
                    type="text"
                    id="searchBar"
                    aria-describedby="searchBar"
                    placeholder="Search"
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <Form.Text id="searchBar">
                    Search an ingredient inside your pantry
                </Form.Text>
            </div>
            <Form onSubmit={handleSubmit}>
                <Row className="justify-content-center">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            ref={ingredientNameRef}
                            placeholder="Ingredient name"
                            maxLength={24}
                        />
                        <Form.Control
                            type="number"
                            ref={ingredientQuantityRef}
                            placeholder="Ingredient quantity"
                            value={quantity}
                            onChange={(e) => handleQuantityInput(e)}
                        />
                        <Form.Select
                            ref={ingredientUnitRef}
                            aria-label="Default select"
                        >
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            <option value="unit">unit</option>
                            <option value="tsp">tsp</option>
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
                {filteredIngredients.map((ingredient) => (
                    <ListGroup.Item
                        as="li"
                        key={ingredient.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        {editingId === ingredient.id ? (
                            <>
                                <Form.Control
                                    type="text"
                                    ref={editIngredientNameRef}
                                    defaultValue={ingredient.name}
                                    className="me-2"
                                />
                                <Form.Control
                                    type="number"
                                    ref={editIngredientQuantityRef}
                                    defaultValue={ingredient.quantity}
                                    className="me-2"
                                />
                                <Button
                                    variant="success"
                                    onClick={() => handleSave(ingredient.id)}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <span style={{ flexBasis: '35%' }}>{ingredient.name}</span>
                                <span style={{ flexBasis: '30%' }}>{`${ingredient.quantity} ${ingredient.unit}`}</span>
                                <DropdownButton
                                    id="dropdown-basic-button"
                                    title="Options"

                                >
                                    <Dropdown.Item
                                        onClick={() =>
                                            deleteIngredient(ingredient.id)
                                        }
                                    >
                                        Delete
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() =>
                                            handleUpdate(ingredient.id)
                                        }
                                    >
                                        Update
                                    </Dropdown.Item>
                                </DropdownButton>
                            </>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
}
