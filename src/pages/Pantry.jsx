import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';

import { ListGroup, DropdownButton, Dropdown, InputGroup, Form, Row, Col, Button } from 'react-bootstrap';

export default function Pantry() {
    const { filteredIngredients } = useContext(GlobalContext);

    return (
        <>
            <Form>
                <Row className="align-items-center">
                    <InputGroup className="mb-3">
                        <Col>
                            <Form.Control placeholder="Ingredient name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Ingredient quantity" />
                        </Col>
                        <Col>
                            <Form.Select aria-label="Default select example">
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="l">l</option>
                                <option value="ml">ml</option>
                                <option value="unit">unit</option>
                            </Form.Select></Col>
                        <Col>
                            <Button variant="primary">Add</Button>
                        </Col>
                    </InputGroup>
                </Row>
            </Form>

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
