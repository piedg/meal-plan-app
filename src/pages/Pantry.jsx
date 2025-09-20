import { useContext } from 'react';
import { GlobalContext } from '../contexts/GlobalContextProvider.jsx';

import { ListGroup, DropdownButton, Dropdown, InputGroup, Form, Row, Col } from 'react-bootstrap';

export default function Pantry() {
    const { instruments } = useContext(GlobalContext);

    return (
        <>
            <Form>
                <Row>
                    <InputGroup className="mb-3">
                        <Col>
                            <Form.Control placeholder="Ingredient name" />
                        </Col>
                        <Col>
                            <Form.Control placeholder="Ingredient quantity" />
                        </Col>
                    </InputGroup>
                </Row>
            </Form>

            <ListGroup>
                {instruments.map((el) =>
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
